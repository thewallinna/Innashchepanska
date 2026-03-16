document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("sh-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const navToggle = document.querySelector(".sh-nav-toggle");
  const navList = document.getElementById("sh-nav-list");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navList.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 720 && navList.classList.contains("is-open")) {
          navList.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.substring(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const faqButtons = document.querySelectorAll(".sh-faq-item");
  faqButtons.forEach((button) => {
    const answer = button.nextElementSibling;
    if (!(answer instanceof HTMLElement)) return;

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      answer.classList.toggle("is-open", !expanded);
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const revealItems = document.querySelectorAll(".sh-reveal");
    if (revealItems.length > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
        }
      );

      revealItems.forEach((el) => observer.observe(el));
    }
  }
});

