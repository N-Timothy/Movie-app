import {config} from '../config.js'

let LOCAL = config.localServer;

export default async function updateData(key, newData, mode) {
    const res = await fetch(`${LOCAL}/${mode}/${key}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title" : newData.title,
            "overview" : newData.overview,
            "posterPath" : newData.posterPath
        })
    });
    const data = await res.json();
    console.log(data);
}