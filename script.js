const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");
const menuToggleContainer = document.getElementById("menu-toggle-container");
const menuText = document.getElementById("menu-text");
const menuButton = document.getElementById("menu-toggle");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Project data
const projectData = {
  finance: {
    title: "Personal Finance Manager",
    description:
      "Full-stack application designed to help users manage their personal finances effectively. Track income and expenses, set budget goals, analyze spending patterns by category, and monitor savings progress. ",
    image: "finance",
    imagePlaceholder: "Finance Dashboard Screenshot",
    techStack: [
      "Angular",
      "Spring Boot",
      "MySQL",
      "JWT Authentication",
      "Chart.js",
      "Bootstrap",
    ],
    links: [
      { text: "Live Demo", url: "#", primary: true },
      {
        text: "GitHub",
        url: "https://github.com/EnriqueLJ23/finances-frontend",
        primary: false,
      },
    ],
  },
  webos: {
    title: "Web-Based OS Desktop Simulation",
    description:
      "A simulation of a desktop operating system built entirely with modern web technologies. Features include draggable and resizable windows, a functional taskbar with window management, multiple desktop applications, file system simulation, and a responsive design that adapts to different screen sizes.",
    image: "webos",
    imagePlaceholder: "WebOS Desktop Screenshot",
    techStack: ["Angular", "TypeScript", "HTML5", "CSS3"],
    links: [
      {
        text: "Live Demo",
        url: "https://enriquelj23.github.io/WebOs/",
        primary: true,
      },
      {
        text: "GitHub",
        url: "https://github.com/EnriqueLJ23/WebOs",
        primary: false,
      },
    ],
  },
};
function openProjectDialog(projectKey) {
  const project = projectData[projectKey];
  const overlay = document.getElementById("dialog-overlay");
  const dialog = document.getElementById("project-dialog");
  const dialogImage = document.getElementById("dialog-image");
  const dialogImagePlaceholder = document.getElementById(
    "dialog-image-placeholder"
  );
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogTechStack = document.getElementById("dialog-tech-stack");
  const dialogLinks = document.getElementById("dialog-links");

  // Set dialog content
  dialogImage.className = `dialog-image ${project.image}`;

  // Replace placeholder with actual image
  dialogImagePlaceholder.innerHTML = `<img src="icons/preview_${project.image}.png" alt="${project.title}" >`;

  dialogDescription.textContent = project.description;

  // Clear and populate tech stack
  dialogTechStack.innerHTML = "";
  project.techStack.forEach((tech) => {
    const badge = document.createElement("span");
    badge.className = "dialog-tech-badge";
    badge.textContent = tech;
    dialogTechStack.appendChild(badge);
  });

  // Clear and populate links
  dialogLinks.innerHTML = "";
  project.links.forEach((link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link.url;
    linkElement.target = "_blank";
    linkElement.className = link.primary
      ? "dialog-link"
      : "dialog-link secondary";
    linkElement.textContent = link.text;
    dialogLinks.appendChild(linkElement);
  });

  // Show dialog
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectDialog() {
  const overlay = document.getElementById("dialog-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close dialog when clicking overlay
document.getElementById("dialog-overlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeProjectDialog();
  }
});

// Close dialog with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectDialog();
  }
});

document.querySelectorAll(".experience-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains("active");

    // Close all items
    document.querySelectorAll(".experience-item").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".experience-header").setAttribute(
        "aria-expanded",
        "false"
      );
    });

    // Open clicked one
    if (!isOpen) {
      item.classList.add("active");
      header.setAttribute("aria-expanded", "true");
    }
  });
});
function createParticle(index) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random size (small)
  const size = Math.random() * 3 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Set initial position and opacity immediately
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.opacity = Math.random() * 0.3 + 0.1; // Start visible

  particlesContainer.appendChild(particle);

  // Start animation with staggered delay for natural effect
  setTimeout(() => {
    animateParticle(particle);
  }, index * 50); // Stagger the start of animations
}

function resetParticle(particle) {
  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;

  return {
    x: posX,
    y: posY,
  };
}

function animateParticle(particle) {
  const pos = resetParticle(particle);

  // Animation properties
  const duration = Math.random() * 80 + 20; // 20-100 seconds for very slow movement

  // Set transition and start animation
  particle.style.transition = `all ${duration}s linear`;
  particle.style.opacity = Math.random() * 0.3 + 0.1;

  // Move in a slight direction
  const moveX = pos.x + (Math.random() * 20 - 10);
  const moveY = pos.y - Math.random() * 30;
  particle.style.left = `${moveX}%`;
  particle.style.top = `${moveY}%`;

  // Reset after animation completes
  setTimeout(() => {
    animateParticle(particle);
  }, duration * 1000);
}

// Hero title hacker effect
document.querySelector(".hero h1").onmouseover = (event) => {
  let iteration = 0;
  const interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    if (iteration >= event.target.dataset.value.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
};
