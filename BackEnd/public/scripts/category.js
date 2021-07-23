export default function Modal() {

  const modalWrapper = document.querySelector(".category-wrapper");

  const cancel = document.querySelector(".category-wrapper");

  cancel.addEventListener("click", close);

  function open() {
    modalWrapper.classList.add("active");
  };

  function close() {
    modalWrapper.classList.remove("active");
  }
  
  return {
    open, close
  }
}
