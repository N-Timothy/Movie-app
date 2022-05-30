import '../css/style.css';
import { config } from './config.js';
import { getMoviesModeLocal } from './movies';
import pageSetting, { unsetColor } from './pagination.js';
import {current_page } from './pagination.js';
import add_movie from './add';
import { add_movie_modal } from './add';

// import { get_request } from './CRUD/get_request.js';
// import { post_data } from './CRUD/post_data.js';
// import { delete_data } from './CRUD/delete_data';
import { generate_data } from './CRUD/generate_data';

import review from './review';

const movie = document.getElementById("movies");

let movieMod = getMoviesModeLocal(1).now_Showing;
let movieID = [];
let delMovieId = [];
let MOD = 'now_Showing';

async function getMovies() {
  let data = [];
  try {
    let res = await fetch(movieMod);
    data = await res.json();
  } catch (e) {}
  return data;
}

async function setMovieID() {
  let data = await getMovies();
  let movies = data;
  movieID = [];
  delMovieId = [];
  for(let key in movies) {
    movieID.push(key);
  }
  delMovieId = movieID;
}


async function displayMovies(clear = 0) {
  let data = await getMovies();
  let movies = data;
  if (!clear) {
  for (let key of movieID) {
      let MOVIE = movies[key]['data']
      let mov = document.createElement('div');
      mov.id = `mov${key}`;
      mov.className = "mov";
      let poster = `<img src=${config.image_base_url + MOVIE.poster_path} class="poster" id=mov${key}>`
      mov.innerHTML = poster;
      mov.addEventListener('click', () => {
      let realKey;
        if(key == 0) {
            switch (current_page){
              case 1:
                realKey = 0;
                break;
              case 2:
                realKey = 19;
                break;
              case 3:
                realKey = 39;
                break;
              case 4:
                realKey = 59;
                break;
              case 5:
                realKey = 79;
                break;
            }
        } else {
          realKey = (key * current_page) + (current_page - 1);
        }

        review(realKey, MOVIE, MOD);
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
    let data = getMoviesModeLocal(current_page);
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
      let MOVIE = movies[key]['data']
      let title = MOVIE.title;
      title = title.toLowerCase();
      if(title.includes(search.value.toLowerCase())) {
        movieID.push(key);
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
    setMovieID();
    displayMovies(1);
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
    setMovieID();
    displayMovies(1);
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

      setMovieID();
      displayMovies(1);
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