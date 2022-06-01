import {config} from '../config.js'

let LOCAL = config.localServer;
let HEROKU = config.herkouServer;

export async function delete_data(key, mode) {
    console.log(`${HEROKU}/${mode}/${key}`)
    const res = await fetch(`${HEROKU}${mode}/${key}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
    location.reload();
}