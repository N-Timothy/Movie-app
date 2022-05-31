import {config} from '../config.js'

let LOCAL = config.localServer;

export async function delete_data(key, mode) {
    console.log(`${LOCAL}/${mode}/${key}`)
    const res = await fetch(`${LOCAL}${mode}/${key}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
}