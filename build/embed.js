!function(){"use strict";function n(n){var t,e="";n.user?(e+="\n    ",n.user.admin&&(e+='\n    <div class="schnack-settings">\n        <button class="schnack-action" data-target="notification" data-class="setting" data-action="true">'+(null==(t=n.partials.UnMute)?"":t)+'</button>\n        <button class="schnack-action" data-target="notification" data-class="setting" data-action="false">'+(null==(t=n.partials.Mute)?"":t)+"</button>\n    </div>\n    "),e+='\n<div class="schnack-login-status">\n    '+(null==(t=n.partials.LoginStatus.replace("%USER%",n.user.name))?"":t)+'\n</div>\n<div class="schnack-above">\n    <div class="schnack-form">\n        <textarea class="schnack-body" placeholder="'+(null==(t=n.partials.PostComment)?"":t)+'"></textarea>\n        <blockquote class="schnack-body" style="display:none"></blockquote>\n        <br>\n        <button class="schnack-preview">'+(null==(t=n.partials.Preview)?"":t)+'</button>\n        <button style="display:none" class="schnack-write">'+(null==(t=n.partials.Edit)?"":t)+'</button>&nbsp;\n        <button class="schnack-send-comment schnack-button">'+(null==(t=n.partials.SendComment)?"":t)+'</button>&nbsp;\n        <button class="schnack-cancel-reply" style="display:none">'+(null==(t=n.partials.Cancel)?"":t)+"</button>\n    </div>\n</div>\n"):(e+='\n<div class="schnack-signin">\n'+(null==(t=n.partials.SignInVia)?"":t)+"<br>\n",n.auth.forEach(function(a,s){e+="\n    "+(null==(t=s?n.partials.Or:"")?"":t)+'<button class="schnack-signin-'+(null==(t=a.id)?"":t)+'"><i class="icon schnack-icon-'+(null==(t=a.id)?"":t)+'"></i> '+(null==(t=a.name)?"":t)+"</button>\n"}),e+="\n"),e+="\n</div>\n";var a=[];return n.replies={},n.comments.forEach(function(t){t.reply_to?(n.replies[t.reply_to]||(n.replies[t.reply_to]=[]),n.replies[t.reply_to].push(t)):a.push(t)}),n.comments=a,e+="\n"+(null==(t=n.comments_tpl(n))?"":t)+'\n<style type="text/css">\n.schnack-action > * { pointer-events: none; }\n</style>\n'}function t(n){var t,e="";return e+='<ul class="schnack-comments">\n    ',n.comments.forEach(function(a){e+='\n        <li id="comment-'+(null==(t=a.id)?"":t)+'" data-id="'+(null==(t=a.id)?"":t)+'" class="schnack-comment',a.approved||a.trusted||(e+=" schnack-not-approved"),e+='">\n            <div class="schnack-comment-inner">\n                <div class="schnack-dateline">\n                    <span class="schnack-author">',a.author_url&&(e+='<a href="'+(null==(t=a.author_url)?"":t)+'" target="_blank">'),e+=null==(t=a.display_name||a.name)?"":t,a.author_url&&(e+="</a>"),e+="</span>\n                    ",n.user&&n.user.admin&&!a.trusted&&["trust","block"].forEach(function(n){e+='\n                    <button class="schnack-action" data-target="'+(null==(t=a.user_id)?"":t)+'" data-class="user" data-action="'+(null==(t=n)?"":t)+'"><i class="icon schnack-icon-'+(null==(t=n)?"":t)+'"></i> <span>'+(null==(t=n)?"":t)+"</span></button>\n                    "}),e+='\n                    <span class="schnack-date"><a href="#comment-'+(null==(t=a.id)?"":t)+'">'+(null==(t=a.created_at_s)?"":t)+'</a></span>\n                </div>\n                <blockquote class="schnack-body">\n                    '+(null==(t=a.comment)?"":t)+"\n                </blockquote>\n                ",a.approved||a.trusted?n.user&&(e+='\n                <button class="schnack-reply" data-reply-to="'+(null==(t=a.id)?"":t)+'">'+(null==(t=n.partials.Reply)?"":t)+"</button>\n                "):(e+='\n                <div class="schnack-awaiting-approval">\n                    ',n.user&&n.user.admin&&["approve","reject"].forEach(function(n){e+='\n                    <button class="schnack-action" data-target="'+(null==(t=a.id)?"":t)+'" data-class="comment" data-action="'+(null==(t=n)?"":t)+'"><i class="icon schnack-icon-'+(null==(t=n)?"":t)+'"></i> <span>'+(null==(t=n)?"":t)+"</span></button>\n                    "}),e+="\n                    "+(null==(t=n.user.admin?n.partials.AdminApproval:n.partials.WaitingForApproval)?"":t)+"\n                </div>\n                "),e+="\n                ",n.user&&n.user.admin&&(e+='\n                <button class="schnack-edit" data-target="'+(null==(t=a.id)?"":t)+'"><i class="icon schnack-icon-edit"></i> <span>编辑</span></button>\n                <button class="schnack-action" data-target="'+(null==(t=a.id)?"":t)+'" data-class="comment" data-action="remove"><i class="icon schnack-icon-remove"></i> <span>删除</span></button>\n                '),e+="\n            </div>\n            ",n.replies[a.id]&&(n.comments=n.replies[a.id],e+="\n            "+(null==(t=n.comments_tpl(n))?"":t)+"\n            "),e+="\n        </li>\n    "}),e+="\n</ul>\n"}var e="function"==typeof fetch?fetch.bind():function(n,t){return t=t||{},new Promise(function(e,a){function s(){var n,t=[],e=[],a={};return i.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(s,i,c){t.push(i=i.toLowerCase()),e.push([i,c]),n=a[i],a[i]=n?n+","+c:c}),{ok:2==(i.status/100|0),status:i.status,statusText:i.statusText,url:i.responseURL,clone:s,text:function(){return Promise.resolve(i.responseText)},json:function(){return Promise.resolve(i.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([i.response]))},headers:{keys:function(){return t},entries:function(){return e},get:function(n){return a[n.toLowerCase()]},has:function(n){return n.toLowerCase()in a}}}}var i=new XMLHttpRequest;i.open(t.method||"get",n,!0);for(var c in t.headers)i.setRequestHeader(c,t.headers[c]);i.withCredentials="include"==t.credentials,i.onload=function(){e(s())},i.onerror=a,i.send(t.body||null)})},a=function(n){return document.querySelector(n)},s=function(n){return document.querySelectorAll(n)},i=function(n){this.options=n,this.options.endpoint=n.host+"/comments/"+n.slug,this.initialized=!1,this.firstLoad=!0;var t=new URL(n.host);if("localhost"!==t.hostname)try{document.domain=t.hostname.split(".").slice(1).join(".")}catch(n){}this.refresh()};i.prototype.refresh=function(){var i=this,c=this.options,o=c.target,l=c.slug,r=c.host,d=c.endpoint,u=c.partials;e(d,{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(c){c.comments_tpl=t,c.partials=u,a(o).innerHTML=n(c);var p=a(o+" div.schnack-above"),h=a(o+" div.schnack-form"),m=a(o+" textarea.schnack-body"),f=a(o+" .schnack-form blockquote.schnack-body"),y=window.localStorage.getItem("schnack-draft-"+l);y&&m&&(m.value=y);var k=a(o+" .schnack-button"),v=a(o+" .schnack-preview"),b=a(o+" .schnack-write"),g=a(o+" .schnack-cancel-reply"),w=s(o+" .schnack-reply"),E=s(o+" .schnack-edit");if(k&&(k.addEventListener("click",function(n){var t=m.value;e(d,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:t,replyTo:h.dataset.reply,editId:h.dataset.edit})}).then(function(n){return n.json()}).then(function(n){m.value="",window.localStorage.setItem("schnack-draft-"+l,m.value),n.id&&(i.firstLoad=!0,window.location.hash="#comment-"+n.id),i.refresh()})}),v.addEventListener("click",function(n){var t=m.value;m.style.display="none",v.style.display="none",f.style.display="block",b.style.display="inline",e(r+"/markdown",{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:t})}).then(function(n){return n.json()}).then(function(n){f.innerHTML=n.html})}),b.addEventListener("click",function(n){m.style.display="inline",v.style.display="inline",f.style.display="none",b.style.display="none"}),m.addEventListener("keyup",function(){window.localStorage.setItem("schnack-draft-"+l,m.value)}),w.forEach(function(n){n.addEventListener("click",function(){delete h.dataset.edit,h.dataset.reply=n.dataset.replyTo,g.style.display="inline-block",n.parentElement.appendChild(h),h.parentElement.querySelector(".schnack-body").style.display="block"})}),g.addEventListener("click",function(){h.parentElement.querySelector(".schnack-body").style.display="block",p.appendChild(h),delete h.dataset.reply,delete h.dataset.edit,g.style.display="none"}),E.forEach(function(n){n.addEventListener("click",function(){var t=h.parentElement.querySelector(".schnack-body");t&&(t.style.display="block");var a=n.dataset;e(r+"/get_comment/"+a.target,{credentials:"include",method:"GET",headers:{"Content-Type":"application/json"}}).then(function(n){return n.json()}).then(function(t){delete h.dataset.reply,h.dataset.edit=a.target,m.value=t.comment.comment,g.style.display="inline-block";var e=n.parentElement,s=e.querySelector(".schnack-body");s.style.display="none",e.insertBefore(h,s.nextSibling)})})})),c.user){var S=a("a.schnack-signout");S&&S.addEventListener("click",function(n){n.preventDefault(),e(r+"/signout",{credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(){return i.refresh()})})}else c.auth.forEach(function(n){var t=a(o+" .schnack-signin-"+n.id);t&&t.addEventListener("click",function(t){var a=function(t){void 0===t&&(t="");var e=window.open(r+"/auth/"+n.id+(t?"/d/"+t:""),n.name+" Sign-In","resizable,scrollbars,status,width=600,height=500");window.__schnack_wait_for_oauth=function(){e.close(),i.refresh()}};if("mastodon"===n.id){var s=window.prompt("Please enter the domain name of the Mastodon instance you want to sign in with:","mastodon.social");e("https://"+s+"/api/v1/instance").then(function(n){return n.json()}).then(function(n){n.uri===s?a(s):window.alert('We could not find a Mastodon instance at "'+s+'". Please try again.')}).catch(function(n){console.error(n),window.alert('We could not find a Mastodon instance at "'+s+'". Please try again.')})}else a()})});if(c.user&&c.user.admin){if(!i.initialized){var L=document.createElement("script");L.setAttribute("src",r+"/push.js"),document.head.appendChild(L),i.initialized=!0}var T=function(n){if(confirm("确认吗？")){var t=n.target.dataset;e(r+"/"+t.class+"/"+t.target+"/"+t.action,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:""}).then(function(){return i.refresh()})}};document.querySelectorAll(".schnack-action").forEach(function(n){n.addEventListener("click",T)})}if(i.firstLoad&&window.location.hash.match(/^#comment-\d+$/)){var _=document.querySelector(window.location.hash);_&&(_.scrollIntoView(),_.classList.add("schnack-highlight")),i.firstLoad=!1}})},function(){var n=document.querySelector("script[data-schnack-target]");if(!n)return console.warn("schnack script tag needs some data attributes");var t=n.dataset,e=t.schnackSlug,a=new URL(n.getAttribute("src")),s=a.protocol+"//"+a.host,c={Preview:"Preview",Edit:"Edit",SendComment:"Send comment",Cancel:"Cancel",Or:"Or",Mute:"mute notifications",UnMute:"unmute",PostComment:"Post a comment. Markdown is supported!",AdminApproval:"This comment is still waiting for your approval",WaitingForApproval:"Your comment is still waiting for approval by the site owner",SignInVia:"To post a comment you need to sign in via",Reply:"<i class='icon schnack-icon-reply'></i> reply",LoginStatus:"(signed in as <span class='schnack-user'>@%USER%</span> :: <a class='schnack-signout' href='#'>sign out</a>)"};Object.keys(c).forEach(function(t){n.dataset["schnackPartial"+t]&&(c[t]=n.dataset["schnackPartial"+t])}),new i({target:t.schnackTarget,slug:e,host:s,partials:c})}()}();
