export default function Search() {
  const element = document.querySelector(".search-input input");

  element.addEventListener("focusout", off);
  const divElement = document.querySelector(".search-input");
  const imgElement = document.querySelector(".search-input img");

  function on() {
    divElement.classList.add('active');
    imgElement.classList.add('active');
  }
  function off() {
    divElement.classList.remove('active');
    imgElement.classList.remove('active');
  }

  return {
    on, off
  }
}