const menuBtn = document.querySelector(".navLeft");
const menuBox = document.querySelector(".menuBox");

const loginBtn = document.querySelector(".loginBtn");
const loginBox = document.querySelector(".loginBox");

const shopNow = document.getElementById("shopNow");

menuBtn.addEventListener("click", () => {
	menuBox.classList.toggle("active");
});

loginBtn.addEventListener("click", () => {
  loginBox.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 600) {
    document.querySelector(".menuBox").classList.remove("active");
    document.querySelector(".loginBox").classList.remove("active");
  }
});

shopNow.addEventListener("click", () => {
  window.location.href = "Home.html";
});