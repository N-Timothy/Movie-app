import getMovieModes from '../movies.js';
import {config} from '../config.js'

let LOCAL = config.localServer;

let pages = [1,2,3,4,5];

export async function generate_data() {
    for (let key in getMovieModes(1)){
        for (let page of pages) {
            const result = await fetch(`${getMovieModes(page)[`${key}`]}`);
            const resData = await result.json()
            const allMovies = resData.results;
            for(let movie of allMovies) {     
                const res = await fetch(`${LOCAL}${key}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "title": `${movie.title}`,
                        "overview": `${movie.overview}`,
                        "posterPath": `${movie.poster_path}`
                    })
                });
                const data = await res.json();
                console.log(data);
            }
        } 
    }
  
}

// export async function generate_data() {
//     const res = await fetch(`${LOCAL}now_showing`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "title": "Morbius",
//             "overview": "asdfgg",
//             "posterPath": "asdfasdgasdg"
//         })
//     }); 
//     const data = await res.json();
//     console.log(data);
// }