import Modal from './modal.js';

const modal = Modal();

const requestButton = document.querySelector("header a.request");

requestButton.addEventListener("click", event => {
  event.preventDefault();

  const form = document.querySelector(".modal form");
  form.setAttribute("action", "request");

  modal.open();
})