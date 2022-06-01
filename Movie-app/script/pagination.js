import { getMoviesModeBackend } from "./movies.js";

export let current_page = 1;
export let max_page = 9;
export let MOVIEMOD;

export function getCurrentPage() {
  if(document.cookie.length < 2) {
    setCookiePage();
    setCookieMod();
  } else {
    let cookies = document.cookie;
    let cookie = cookies.split(";")
    if(cookie[1].includes("mod")) {
      MOVIEMOD = cookie[1].split("=")[1];
      current_page = cookie[0].split("=")[1];
    } else {
      MOVIEMOD = cookie[0].split("=")[1]
      current_page = cookie[1].split("=")[1]
    }
  }
}

function setCookiePage() {
  const date = new Date();
  var time = date.getTime();
  var expire = time + 1000 * 36000 //cookie
  date.setTime(expire);
  document.cookie = `current_page=${current_page}; max-age=86400; path=/;`;

}

export function setCookieMod(mod = "now_showing") {
  const date = new Date();
  var time = date.getTime();
  var expire = time + 1000 * 36000 //cookie
  date.setTime(expire);
  document.cookie = `mod=${mod}; max-age=86400; path=/;`
}

export default function pageSetting(val) {
    if (val === '-1') {
        if(current_page !== 1) {
            current_page -= 1;
        } else {}
    } else if (val === '+1' ) {
        if (current_page !== max_page) {
            current_page += 1;
        }
    } else {
        current_page = parseInt(val);
    }
    setCookiePage();
    return getMoviesModeBackend(current_page);
}


export function unsetColor(val) {
    for (let x = 1; x < 6; x++) {
      if(x === val) {
        continue;
      } else {
        let doc = document.getElementById(`page${x}`)
        doc.className = "page";
      }
    }
  }