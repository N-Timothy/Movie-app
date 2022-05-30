export async function post_data(mode, newData) {
    const oldData = await fetch(`https://nathanael-website-json-server.herokuapp.com/${mode}`)
    const result = await oldData.json();
    
    const ids = result.map(object => {
        return object.id;
    })
    let nextID = Math.max(...ids) + 1;

        const res = await fetch(`https://nathanael-website-json-server.herokuapp.com/${mode}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: nextID,
            data: newData
        })
    });
    const data = await res.json();
    console.log(data);
}