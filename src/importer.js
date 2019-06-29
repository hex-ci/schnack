const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const sqlite = require('sqlite');
const queries = require('./db/queries');
const toMarkdown = require('to-markdown');
const dbPromise = sqlite.open('./comments.db', { Promise });
let db;

const filename = process.argv.slice(2, 3).pop();
if (!filename) {
    console.error('Pass the filepath to your XML file as argument');
    process.exit(1);
}

// Promisify readFile
async function readFile(file) {
    const promise = await new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            else resolve(data.toString());
        });
    });
    return promise;
}

// Promisify parse XML
async function parse(file) {
    const promise = await new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(file, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
    return promise;
}

function getWPAuthor(comment) {
    return [
        'old',
        comment['wp:comment_author_id'],
        comment['wp:comment_author'].trim(),
        comment['wp:comment_author'].trim(),
        '',
        1
    ];
}

function getWPComment(thread, comment) {
    return [
        thread['dsq:thread_identifier'],
        comment['wp:comment_content'],
        comment['wp:comment_parent'],
        comment['wp:comment_date_gmt'],
        comment['wp:comment_approved']
    ];
}

function formatWPComment(comment, thread) {
    return {
        author: getWPAuthor(comment),
        comment: getWPComment(thread, comment),
        id: comment['wp:comment_id']
    };
}

function rebuildWP(threads) {
  const result = {};

  for (let thread of threads) {
    if (result[thread['dsq:thread_identifier']]) {
      result[thread['dsq:thread_identifier']]['wp:comment'].push(thread['wp:comment']);
    }
    else {
      const obj = Object.assign({}, thread);
      obj['wp:comment'] = [obj['wp:comment']];
      result[thread['dsq:thread_identifier']] = obj;
    }
  }

  return Object.values(result);
}

async function parseWP(data) {
    const threads = rebuildWP(data.rss.channel.item);

    for (let thread of threads) {
        const comments = thread['wp:comment'];
        if (comments) {
            if (comments.length) {
                const formatted = comments.map(comment => formatWPComment(comment, thread));
                await saveComments(formatted);
            } else {
                const formatted = formatWPComment(comments, thread);
                await saveComments([formatted]);
            }
        }
    }
}

async function saveComment(post) {
    db = await dbPromise;
    const { comment, author } = post;

    if (!author[1]) {
        const nickname = '网友';
        author[1] = nickname;
        author[2] = nickname;
        author[3] = nickname;
    }

    try {
        const newUser = await db.get(queries.find_user, [author[0], author[1]]);
        if (newUser && newUser.id) {
          comment.unshift(newUser.id); // push user_id to the front
        }
        else {
          const res = await db.run(queries.create_user, author);
          comment.unshift(res.lastID);
        }
        const res = await db.run(
            `INSERT INTO comment
        (user_id, slug, comment, reply_to, created_at, approved, rejected)
        VALUES (?,?,?,?,?,?,0)`,
            comment
        );
        return res.lastID;
    } catch (err) {
        console.error(`Error saving the comment for the slug ${comment[0]}:`, err);
    }
}

async function saveComments(posts) {
    for (let post of posts) {
        const newComment = await saveComment(post);
        post.new_id = newComment;
    }

    for (let post of posts) {
        const replies = posts.filter(p => p.comment[3] === post.id); // replies to current post
        if (replies) {
            for (let reply of replies) {
                const { id, new_id } = post;
                await db.run(`UPDATE comment SET reply_to = ? WHERE reply_to = ?`, [new_id, id]);
            }
        }
    }
}

function getDisqusComments(threads, comment) {
    const { author } = comment;
    const thread = threads.filter(thread => thread.$['dsq:id'] === comment.thread.$['dsq:id'])[0]
        .id;
    const reply_to = comment.parent ? comment.parent.$['dsq:id'] : null;
    const message = toMarkdown(comment.message.trim());
    const timestamp = comment.createdAt;
    const approved = comment.isDeleted === 'true' || comment.isSpam === 'true' ? 0 : 1;

    return {
        comment: [thread, message, reply_to, timestamp, approved],
        id: comment.$['dsq:id'],
        author: ['disqus', author.username, author.name, author.username, 0]
    };
}

async function parseDisqus(data) {
    const threads = data.disqus.thread;
    const posts = data.disqus.post.map(comment => getDisqusComments(threads, comment));

    await saveComments(posts);
}

// Main
async function run() {
    try {
        const filePath = path.resolve(__dirname, '..', filename);
        const content = await readFile(filePath);
        // const result = await parse(content);
        const result = JSON.parse(content);

        if (result.disqus) {
            parseDisqus(result);
        } else if (result.rss) {
            parseWP(result);
        }
    } catch (error) {
        console.error('Error parsing the file:', filename);
        console.error(error);
    }
}

run();
