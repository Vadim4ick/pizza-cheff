const burger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

burger.addEventListener("click", function () {
  this.classList.toggle("open");
  navbar.classList.toggle("open");
});
