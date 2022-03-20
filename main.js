"use strict";

// nabvar 투명(transparent)일때 스크롤 -> background color
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// navbar 메뉴 click
const navbarMenu = document.querySelector(".navbar_menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  const scrollMove = document.querySelector(link);
  const top =
    scrollMove.offsetTop - navbarHeight < 0 ? 0 : scrollMove.offsetTop - 25;

  window.scrollTo({
    top: top,
    left: 0,
    behavior: "smooth",
  });
  //scrollIntoView(link);
});

// navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar_toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// contact button in home section
const contactHome = document.querySelector(".home_button");
contactHome.addEventListener("click", () => {
  scrollIntoView("#contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// Home section, slowly fade
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow up
const arrowUp = document.querySelector(".arrow");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work_categories");
const proejctBtnContainer = document.querySelector(".work_projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  const selected = document.querySelector(".category_btn.active");
  selected.classList.remove("active");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("active");

  // animation
  proejctBtnContainer.classList.add("anime-out");

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    proejctBtnContainer.classList.remove("anime-out");
  }, 300);
});
