// Navbar
const sections = document.querySelectorAll("section[id]");

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".group a[href*=" + sectionId + "]")
        .classList.add("active-link");
      document
        .querySelector(".group a[href*=" + sectionId + "]")
        .classList.remove("dark:text-white");
    } else {
      document
        .querySelector(".group a[href*=" + sectionId + "]")
        .classList.remove("active-link");
      document
        .querySelector(".group a[href*=" + sectionId + "]")
        .classList.add("dark:text-white");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// portfolio
function tampildata() {
  $.getJSON("src/js/data.json", function (data) {
    let portfolio = data.portfolio;
    $("#portfolio-container").empty();
    $.each(portfolio, function (i, data) {
      $("#portfolio-container").append(
        '<div class="mb-12 p-4 md:w-1/3 portfolio-content" id="' +
          data.kategori +
          '"><div class="overflow-hidden rounded-md shadow-md mb-5"><img src="src/image/portfolio/' +
          data.image +
          '" alt="Landing Page" width="w-full" /></div><a href="' +
          data.link +
          '" class="text-xl font-semibold text-dark dark:text-white" target="_blank">' +
          data.judul +
          '</a><p class="mt-3 text-base font-medium text-secondary desk">' +
          data.deskripsi +
          "</p></div>"
      );
    });
  });
}
tampildata();

// mixit portfolio
// const mixer = mixitup(".portfolio-container", {
//   selectors: {
//     target: ".portfolio-content",
//   },
//   animation: {
//     duration: 400,
//   },
// });

$(".portfolio-item").on("click", function () {
  let kategori = $(this).html();

  if (kategori == "All") {
    tampildata();
    location.reload();
    return;
  }

  $.getJSON("src/js/data.json", function (data) {
    let portfolio = data.portfolio;
    let content = "";

    $.each(portfolio, function (i, data) {
      if (data.kategori == kategori.toLowerCase()) {
        content +=
          '<div class="mb-12 p-4 md:w-1/3 portfolio-content mix ' +
          data.kategori +
          '"><div class="overflow-hidden rounded-md shadow-md mb-5"><img src="src/image/portfolio/' +
          data.image +
          '" alt="Landing Page" width="w-full" /></div><a href="' +
          data.link +
          '" class="text-xl font-semibold text-dark dark:text-white" target="_blank">' +
          data.judul +
          '</a><p class="mt-3 text-base font-medium text-secondary">' +
          data.deskripsi +
          "</p></div>";
      }
    });
    return $(".portfolio-container").html(content);
  });
});

/* Link active portfolio */
const linkPortfolio = document.querySelectorAll(".portfolio-item");

function activePortfolio() {
  if (linkPortfolio) {
    linkPortfolio.forEach((l) => l.classList.remove("active-portfolio"));
    this.classList.add("active-portfolio");
  }
}
linkPortfolio.forEach((l) => l.addEventListener("click", activePortfolio));

// Darkmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindahkan posisi toggle sesuai mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// GSAP animation
gsap.from(".home-image", { opacity: 0, duration: 2, delay: 0.2, x: 60 });
gsap.from(".home-data", { opacity: 0, duration: 2, delay: 0.5, y: 25 });
gsap.from(
  ".home-title, .home-name, .home-profesi, .home-deskripsi, .home-btn",
  { opacity: 0, duration: 2, delay: 0.8, y: 25, ease: "expo.out", stagger: 0.2 }
);
