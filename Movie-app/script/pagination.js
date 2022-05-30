import { getMoviesModeLocal } from "./movies.js";

export let current_page = 1;
export let max_page = 9;

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
    return getMoviesModeLocal(current_page);
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