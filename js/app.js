document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");

  const closeMenu = () => {
    if (!menuToggle || !menu) {
      return;
    }

    menuToggle.classList.remove("is-open");
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Navigation öffnen");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Navigation schliessen" : "Navigation öffnen"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        menu.classList.contains("is-open") &&
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        closeMenu();
      }
    });
  }

  const animatedElements = document.querySelectorAll(
    [
      ".service-card",
      ".region-card",
      ".process-step",
      ".about-image",
      ".value-card",
      ".price-highlight",
      ".service-detail-card",
      ".project-card",
      ".pricing-card",
      ".info-card",
      ".calculation-card",
      ".faq-card",
      ".contact-detail"
    ].join(", ")
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const REVEAL_MS = 650;

  const reveal = element => {
    element.classList.add("show");

    const delay = parseInt(element.style.transitionDelay, 10) || 0;

    // Nach der Einblend-Animation alles aufräumen, damit Hover-Effekte
    // wieder normal und ohne Verzögerung funktionieren.
    window.setTimeout(() => {
      element.classList.remove("hidden", "show");
      element.style.transitionDelay = "";
    }, REVEAL_MS + delay + 80);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  animatedElements.forEach((element, index) => {
    element.classList.add("hidden");
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(element);
  });
});
