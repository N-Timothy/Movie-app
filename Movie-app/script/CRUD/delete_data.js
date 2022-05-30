export async function delete_data(key, mode) {
    console.log(`https://nathanael-website-json-server.herokuapp.com/${mode}/${key}`)
    const res = await fetch(`https://nathanael-website-json-server.herokuapp.com/${mode}/${key}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
}