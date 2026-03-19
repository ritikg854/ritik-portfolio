const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.15,
    rootMargin: "-35% 0px -45% 0px",
  }
);

sections.forEach((section) => observer.observe(section));
