import {config} from '../config.js'

let LOCAL = config.localServer;
let HEROKU = config.herkouServer;

export async function post_data(mode, newData) {
        const res = await fetch(`${HEROKU}${mode}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": newData.title,
            "overview": newData.overview,
            "posterPath": newData.posterPath
        })
    });
    const data = await res.json();
    console.log(data);
}