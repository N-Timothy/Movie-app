import { post_data } from "./CRUD/post_data";
import { current_page, MOVIEMOD } from "./pagination";

var modal = document.getElementById("addmyModal");
var span = document.getElementsByClassName("addClose")[0];

let mode;

export function add_movie_modal() {
    document.getElementById('add').addEventListener('click', () => {
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
          }
    });
}

export default function add_movie() {
    document.getElementById(`page${current_page}`).className = "active";
    document.getElementById('movieDropDown').value = MOVIEMOD;
    document.getElementById('moviesMode').innerHTML = MOVIEMOD.replace(/_/g, ' ');
    let addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', () => {
        mode = document.getElementById('addMovieDropDown').value;
        console.log(document.getElementById('addOverview').value);
        let newData = {
            title: document.getElementById('addTitle').value,
            original_title: document.getElementById('addTitle').value,
            overview: document.getElementById('addOverview').value,
            poster_path: document.getElementById('addPoster').value
        }

        post_data(mode, newData);
        modal.style.display = "none";

    })
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}