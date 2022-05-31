import '../css/style.css';
import { config } from './config.js';
import { getMoviesModeBackend } from './movies';
import pageSetting, { unsetColor } from './pagination.js';
import {current_page } from './pagination.js';
import add_movie from './add';
import { add_movie_modal } from './add';

import { generate_data } from './CRUD/generate_data';

import review from './review';

const movie = document.getElementById("movies");

let movieMod = getMoviesModeBackend(1).now_showing;
let movieID = [];
let delMovieId = [];
let MOD = 'now_showing';

async function getMovies() {
  let data = [];
  try {
    let res = await fetch(movieMod, {
      method: "GET"
    });
    data = await res.json();
  } catch (e) {}
  // console.log(data);
  return data;
}

async function setMovieID() {
  let data = await getMovies();
  let movies = data;
  movieID = [];
  delMovieId = [];
  for(let key of movies) {
    // if(key % 2 == 1) {
    movieID.push(key.id); 
  // }  
  }
  delMovieId = movieID;
}


async function displayMovies(clear = 0) {
  let data = await getMovies();
  let movies = data;
  if (!clear) {
  for (let key of movies) {
      let mov = document.createElement('div');
      mov.id = `mov${key.id}`;
      mov.className = "mov";
      let poster = `<img src=${config.image_base_url + key.posterPath} class="poster" id=mov${key}>`
      mov.innerHTML = poster;
      mov.addEventListener('click', () => {
      review(key, MOD);
      })
      try {
        movie.appendChild(mov);
      } catch(e){
        console.log(e)
      }
    } 
  } else {
    for (let key of delMovieId) {
      let delMov = document.getElementById(`mov${key}`);
      delMov.remove();
    }
  }
}

function changeMovieMod () {
  let mode = document.getElementById('movieDropDown')
  mode.addEventListener('change', () => {
    let search = document.getElementById('searchTitle');
    search.value = "";
    // let data = getMoviesModeLocal(current_page);
    let data = getMoviesModeBackend();
    MOD = mode.value;
    document.getElementById('moviesMode').innerHTML = MOD.replace(/_/g, ' ');
    movieMod = data[MOD];
    delMovieId =  movieID;
    displayMovies(1);
    setMovieID();
    displayMovies();
  })
}

async function searchFilter() {
  let data = await getMovies();
  let movies = data;

  let search = document.getElementById('searchTitle');
  search.addEventListener('input', async () => {

  data = await getMovies();
  movies = data;

  delMovieId =  movieID;
  movieID =  [];
    for (let key in movies) {
      let MOVIE = movies[key]
      let title = MOVIE.title;
      title = title.toLowerCase();
      if(title.includes(search.value.toLowerCase())) {
        // if(key % 2 == 1) {
        movieID.push(key);
      // }
      }
    }
    displayMovies(1);
    displayMovies();
  })
}

function addPagination() {
  let pagination = document.getElementById('pagination');
  
  let prev = document.createElement('a');
  prev.id = 'prev'; 
  prev.innerHTML = "&laquo;";
  prev.className = "page1";
  prev.value = "-1"

  prev.addEventListener('click', () => {
    movieMod = pageSetting(prev.value)[MOD];
    document.getElementById(`page${current_page}`).className = "active";
    unsetColor(current_page);;
    displayMovies(1);
    setMovieID();
    displayMovies();

    // deletePagination();
    // addPagination()
  });

  let next = document.createElement('a');
  next.id = 'next';
  next.innerHTML = '&raquo;';
  next.className = "page1";
  next.value = "+1"

  next.addEventListener('click', () => {
    movieMod = pageSetting(next.value)[MOD];
    document.getElementById(`page${current_page}`).className = "active";
    unsetColor(current_page);
    displayMovies(1);
    setMovieID();
    displayMovies();

    // deletePagination();
    // addPagination();
  })

  pagination.appendChild(prev);

  for(let display = 1; display < 6; display++) {
    let page = document.createElement('a');
    page.id = `page${display}`;
    page.innerHTML = `${display}`;
    page.className = "page";
    pagination.appendChild(page);

    if(display === current_page) {
      page.className = "active";
    }

    page.addEventListener('click', () => {
      movieMod = pageSetting(page.innerHTML)[MOD];
      console.log(MOD);
      displayMovies(1);
      setMovieID();
      displayMovies();
      // deletePagination();
      // addPagination();

      page.className = "active";
      unsetColor(display);
      
    })
  }
  pagination.appendChild(next);
}

// function deletePagination() {
//   for(let display = current_page-1; display < current_page + 4; display++) {
//     document.getElementById(`page${display}`).remove();
//   }
//   document.getElementById('prev').remove();
//   document.getElementById('next').remove();
// }    console.log(getMoviesModeLocal(current_page));


// generate_data();

setMovieID();

displayMovies();
changeMovieMod();
searchFilter();

addPagination();

add_movie_modal();
add_movie();

// post_data();
// delete_data();
// get_request();