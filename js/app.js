const cards = document.querySelectorAll(".service-card, .process-grid div, .about-image");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  card.classList.add("hidden");
  observer.observe(card);
});