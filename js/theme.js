document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".header__theme-toggle");
  const themeIcon = document.querySelector(".header__theme-icon");

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      themeIcon.textContent = newTheme === "light" ? "🌙" : "☀️";

      localStorage.setItem("theme", newTheme);
    });

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeIcon.textContent = savedTheme === "light" ? "🌙" : "☀️";
  }
});
