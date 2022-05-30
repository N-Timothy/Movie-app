import getMovieModes from '../movies.js';

let pages = [1,2,3,4,5];

export async function generate_data() {
    for (let key in getMovieModes(1)){
        let count = 0;
        for (let page of pages) {
            const result = await fetch(`${getMovieModes(page)[`${key}`]}`);
            const resData = await result.json()
            const allMovies = resData.results;
            for(let movie of allMovies) {       
                const res = await fetch(`http://localhost:5555/${key}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: `${count}`,
                        data: movie
                    })
                });
                const data = await res.json();
                console.log(data);
                count += 1;
            }
        } 
    }
  
}