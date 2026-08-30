export function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const sections = document.querySelectorAll("main section[id]");
 
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });
  }
 
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!navMenu || !navToggle) {
        return;
      }
 
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Buka menu");
    });
  });
 
  if (!sections.length || !navLinks.length) {
    return;
  }
 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
 
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-38% 0px -48% 0px",
      threshold: 0.01
    }
  );
 
  sections.forEach((section) => observer.observe(section));
}
