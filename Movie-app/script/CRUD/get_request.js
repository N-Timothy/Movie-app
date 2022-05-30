export async function get_request() {
    const res = await fetch(`https://nathanael-website-json-server.herokuapp.com/now_showing`);
    const data = await res.json();
    for (let key in data) {
        console.log(data[key])
    }
}