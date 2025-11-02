document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        alert("Сообщение отправлено!");
        contactForm.reset();
      } else {
        alert("Пожалуйста, заполните все поля");
      }
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-large");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        filterProjects(filterValue);
      });
    });
  }

  function filterProjects(filter) {
    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-categories").split(",");

      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  }

  const addEntryBtn = document.querySelector(".add-entry-btn");
  if (addEntryBtn) {
    addEntryBtn.addEventListener("click", function () {
      const newEntry = prompt("Введите новую задачу:");
      if (newEntry) {
        const diarySection = document.querySelector(".diary-section");
        const newDiaryEntry = document.createElement("div");
        newDiaryEntry.className = "diary-entry";

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${getMonthName(
          currentDate.getMonth()
        )}`;

        newDiaryEntry.innerHTML = `
                    <div class="diary-date">${formattedDate}</div>
                    <div class="diary-task">${newEntry}</div>
                    <div class="status status-in-progress">in progress</div>
                `;

        diarySection.insertBefore(newDiaryEntry, addEntryBtn);
        alert("Задача добавлена!");
      }
    });
  }

  function getMonthName(monthIndex) {
    const months = [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ];
    return months[monthIndex];
  }

  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    const cleanLinkHref = linkHref.replace("../", "");
    const cleanCurrentPage = currentPage.split("/").pop();

    if (
      cleanLinkHref === cleanCurrentPage ||
      (cleanCurrentPage === "" && cleanLinkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  if (projectCards.length > 0) {
    projectCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  initProjectModals();
});

function initProjectModals() {
  const projectCards = document.querySelectorAll(".project-card-large");
  const modal = document.getElementById("project-modal");
  const closeButton = document.querySelector(".close-modal");

  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const projectId = this.getAttribute("data-project");
      openProjectModal(projectId);
    });
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description").textContent =
    project.description;

  const tagsContainer = document.getElementById("modal-tags");
  tagsContainer.innerHTML = "";
  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });

  const screenshotsContainer = document.getElementById("modal-screenshots");
  screenshotsContainer.innerHTML = "";

  if (project.screenshots && project.screenshots.length > 0) {
    project.screenshots.forEach((screenshot, index) => {
      const screenshotElement = document.createElement("div");
      screenshotElement.className = "screenshot";

      const imgElement = document.createElement("img");
      imgElement.src = screenshot;
      imgElement.alt = `Скриншот проекта ${project.title} - ${index + 1}`;
      imgElement.loading = "lazy";

      screenshotElement.appendChild(imgElement);
      screenshotsContainer.appendChild(screenshotElement);
    });
  } else {
    const noScreenshotsElement = document.createElement("div");
    noScreenshotsElement.className = "no-screenshots";
    noScreenshotsElement.textContent = "Скриншоты проекта временно недоступны";
    screenshotsContainer.appendChild(noScreenshotsElement);
  }

  const featuresContainer = document.getElementById("modal-features");
  featuresContainer.innerHTML = "";
  project.features.forEach((feature) => {
    const featureElement = document.createElement("li");
    featureElement.textContent = feature;
    featuresContainer.appendChild(featureElement);
  });

  const techContainer = document.getElementById("modal-technologies");
  techContainer.innerHTML = "";
  project.technologies.forEach((tech) => {
    const techElement = document.createElement("span");
    techElement.className = "tech-tag";
    techElement.textContent = tech;
    techContainer.appendChild(techElement);
  });

  const linksContainer = document.getElementById("modal-links");
  linksContainer.innerHTML = "";
  if (project.links.demo) {
    const demoLink = document.createElement("a");
    demoLink.href = project.links.demo;
    demoLink.className = "btn btn-primary";
    demoLink.textContent = "Живая версия";
    demoLink.target = "_blank";
    linksContainer.appendChild(demoLink);
  }
  if (project.links.github) {
    const githubLink = document.createElement("a");
    githubLink.href = project.links.github;
    githubLink.className = "btn btn-secondary";
    githubLink.textContent = "Исходный код";
    githubLink.target = "_blank";
    linksContainer.appendChild(githubLink);
  }

  openModal("project-modal");
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);
  }
}

function closeModal() {
  const activeModal = document.querySelector(".modal.active");
  if (activeModal) {
    activeModal.classList.remove("active");
    setTimeout(() => {
      activeModal.style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }
}
