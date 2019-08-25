import fetch from 'unfetch';
import admin_tpl from './admin.jst.html';

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

export default class SchnackAdmin {
    constructor(options) {
        this.options = options;
        this.options.endpoint = `${options.host}/get_newer`;
        this.initialized = false;
        this.firstLoad = true;

        const url = new URL(options.host);

        if (url.hostname !== 'localhost') {
            try {
                document.domain = url.hostname
                .split('.')
                .slice(1)
                .join('.');
            }
            catch (error) {
            }
        }

        this.refresh();
    }

    refresh() {
        const { target, endpoint } = this.options;

        fetch(endpoint, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                $(target).innerHTML = admin_tpl(data);
                // console.log('data', data);
            });
    }
}
