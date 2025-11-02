document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .product-card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("a") && !e.target.closest("button")) {
        card.classList.toggle("card--selected");
        card.classList.toggle("product-card--selected");
      }
    });

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("card--selected");
        card.classList.toggle("product-card--selected");
      }
    });

    card.style.transition = "all 0.3s ease";
  });

  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "translateY(-3px)";
    });

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "translateY(0)";
    });
  });
});
