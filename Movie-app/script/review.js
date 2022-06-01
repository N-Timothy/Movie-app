import updateData from "./CRUD/update_data";
import { delete_data } from "./CRUD/delete_data";

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

let textBox = document.getElementById('overview');
let paragraph = document.getElementById('review');
let save = document.getElementById('save');
let btn = document.getElementById('changeOverview');
let deleteBtn = document.getElementById('delete');
let newData;
let MODE;
let KEY;


export default function review(data, mode) {
    MODE = mode;
    newData = data;
    KEY = data.id;
    modal.style.display = "block";
    
    span.onclick = function() {
        closeModal();
      };

      let modalTitle = document.getElementById('modalTitle');
      modalTitle.innerHTML = data.title;
      let modalReview = document.getElementById('review');
      modalReview.innerHTML = data.overview;
      btn.id = `btn${KEY}`;
      btn.addEventListener('click', () => {
          btn.style = "display: none";
          save.style = 'display: block';
          paragraph.style = "display: none"
          textBox.style = "display: block";
          textBox.value =  paragraph.innerHTML;
          save.id = `save${KEY}`
      })
}

function saved() {
    save.addEventListener('click', () => {
        save.style = 'display: none';
        btn.style = "display: block";
        paragraph.innerHTML = textBox.value;
        paragraph.style = "display: block";
        textBox.style = "display: none";
        newData.overview = textBox.value;
        updateData(KEY, newData, MODE);
    })
}

function delete_movie() {
    deleteBtn.addEventListener('click', () => {
        delete_data(KEY, MODE);
        closeModal();
    })
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
  }

  function closeModal() {
    modal.style.display = "none";
    save.style = 'display: none';
    btn.style = "display: block";
    paragraph.style = "display: block";
    textBox.style = "display: none";
  }

  saved();
  delete_movie();