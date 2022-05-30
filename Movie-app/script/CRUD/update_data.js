export default async function updateData(key, newData, mode) {
    const res = await fetch(`https://nathanael-website-json-server.herokuapp.com/${mode}/${key}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: key,
            data: newData
        })
    });
    const data = await res.json();
    console.log(data);
}