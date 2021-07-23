import Modal from './modal.js';
import SearchInput from './search.js';
import CategoryInput from './category.js';

const modal = Modal();
const search = SearchInput();
const category = CategoryInput();

const requestButton = document.querySelector("header a.request");
const searchElement = document.querySelector(".search-input input");
const categoryButton = document.querySelector(".btn-responsive");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.querySelector("header").classList.add("active");
  } else {
    document.querySelector("header").classList.remove("active");
  }
}

searchElement.addEventListener("focus", event => {
  search.on();
})

categoryButton.addEventListener("click", () => {
  const categoryElement = document.querySelector(".category-wrapper");

  categoryElement.classList.add("active");

  category.open();
})

requestButton.addEventListener("click", event => {
  event.preventDefault();

  const form = document.querySelector(".modal form");
  form.setAttribute("action", "request");

  modal.open();
})