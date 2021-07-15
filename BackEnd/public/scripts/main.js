import Modal from './modal.js';

const modal = Modal();
const requestButton = document.querySelector("header a.request");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.querySelector("header").classList.add("active");
  } else {
    document.querySelector("header").classList.remove("active");
  }
}

requestButton.addEventListener("click", event => {
  event.preventDefault();

  const form = document.querySelector(".modal form");
  form.setAttribute("action", "request");

  modal.open();
})