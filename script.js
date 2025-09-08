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
    images: [
      "icons/finances-preview.png",
      "icons/finances-1.png",
      "icons/finances-2.png",
      "icons/finances-3.png",
    ],
    techStack: [
      "Angular",
      "Spring Boot",
      "MySQL",
      "JWT Authentication",
      "Chart.js",
      "Bootstrap",
    ],
    links: [
      {
        text: "Live Demo",
        url: "https://quiet-semolina-5d21be.netlify.appa",
        primary: true,
      },
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
    images: [
      "icons/preview_webos.png",
      "icons/webos-1.png", // Duplicate for now, you can add more later
      "icons/webos-2.png",
      "icons/webos-3.png",
    ],
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
  wmsone: {
    title: "WMS-One - Warehouse Management System",
    description:
      "A comprehensive React Native Android application designed for efficient warehouse inventory management. Features real-time inventory tracking, barcode scanning, order management, and seamless integration with SAP B1 through a robust Express.js backend API. Built with modern mobile development practices and containerized deployment using Docker.",
    images: [
      "icons/wms-preview.png",
      "icons/wms1.png",
      "icons/wms2.png",
      "icons/wms3.png",
      "icons/wms4.png",
    ],
    techStack: [
      "React Native",
      "Express.js",
      "MySQL",
      "Docker",
      "SAP B1 API",
      "Node.js",
    ],
    links: [
      {
        text: "GitHub",
        url: "https://github.com/EnriqueLJ23/WMS-One",
        primary: true,
      },
    ],
  },
};
// Gallery state
let currentGallery = {
  images: [],
  currentIndex: 0,
};

function openProjectDialog(projectKey) {
  const project = projectData[projectKey];
  const overlay = document.getElementById("dialog-overlay");
  const dialog = document.getElementById("project-dialog");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogTechStack = document.getElementById("dialog-tech-stack");
  const dialogLinks = document.getElementById("dialog-links");

  // Set up gallery
  currentGallery.images = project.images;
  currentGallery.currentIndex = 0;

  initializeGallery();
  updateGalleryImage();

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

// Gallery functions
function initializeGallery() {
  const indicators = document.getElementById("gallery-indicators");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");

  // Create indicator dots
  indicators.innerHTML = "";
  currentGallery.images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "gallery-dot";
    dot.addEventListener("click", () => goToSlide(index));
    indicators.appendChild(dot);
  });

  // Remove existing event listeners to prevent duplicates
  prevBtn.replaceWith(prevBtn.cloneNode(true));
  nextBtn.replaceWith(nextBtn.cloneNode(true));

  // Get fresh references and add event listeners
  const newPrevBtn = document.getElementById("gallery-prev");
  const newNextBtn = document.getElementById("gallery-next");
  newPrevBtn.addEventListener("click", prevImage);
  newNextBtn.addEventListener("click", nextImage);
}

function updateGalleryImage() {
  const galleryImage = document.getElementById("gallery-image");
  const indicators = document.querySelectorAll(".gallery-dot");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");

  // Update image
  galleryImage.src = currentGallery.images[currentGallery.currentIndex];
  galleryImage.alt = `Project Screenshot ${currentGallery.currentIndex + 1}`;

  // Update indicators
  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentGallery.currentIndex);
  });

  // Update navigation buttons
  prevBtn.style.opacity = currentGallery.currentIndex === 0 ? "0.5" : "1";
  nextBtn.style.opacity =
    currentGallery.currentIndex === currentGallery.images.length - 1
      ? "0.5"
      : "1";
}

function nextImage() {
  if (currentGallery.currentIndex < currentGallery.images.length - 1) {
    currentGallery.currentIndex++;
    updateGalleryImage();
  }
}

function prevImage() {
  if (currentGallery.currentIndex > 0) {
    currentGallery.currentIndex--;
    updateGalleryImage();
  }
}

function goToSlide(index) {
  currentGallery.currentIndex = index;
  updateGalleryImage();
}

function handleGalleryKeyboard(e) {
  const overlay = document.getElementById("dialog-overlay");
  if (!overlay.classList.contains("active")) return;

  if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
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

  // Standard size for all particles
  const size = 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Random particle type for different colors and effects
  const particleTypes = ["primary", "secondary", "accent", "glow"];
  const particleType =
    particleTypes[Math.floor(Math.random() * particleTypes.length)];
  particle.classList.add(`particle-${particleType}`);

  // Set initial position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;

  // Random opacity and initial visibility
  particle.style.opacity = Math.random() * 0.8 + 0.2;

  // Add random rotation for visual variety
  particle.style.transform = `rotate(${Math.random() * 360}deg)`;

  particlesContainer.appendChild(particle);

  // Start animation with staggered delay
  setTimeout(() => {
    animateParticle(particle);
  }, index * 100);
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

  // More dynamic animation properties
  const duration = Math.random() * 60 + 30; // 30-90 seconds
  const pulseFreq = Math.random() * 3 + 1; // 1-4 seconds for pulsing

  // Enhanced transition with easing
  particle.style.transition = `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

  // Dynamic opacity animation
  const targetOpacity = Math.random() * 0.6 + 0.2;
  particle.style.opacity = targetOpacity;

  // More complex movement patterns
  const moveX = pos.x + (Math.random() * 40 - 20); // Wider movement range
  const moveY = pos.y + (Math.random() * 60 - 30); // Can move up or down
  const rotation = Math.random() * 720 - 360; // Random rotation

  particle.style.left = `${Math.max(0, Math.min(100, moveX))}%`;
  particle.style.top = `${Math.max(0, Math.min(100, moveY))}%`;
  particle.style.transform = `rotate(${rotation}deg) scale(${
    0.5 + Math.random() * 1.5
  })`;

  // Add pulsing effect
  setTimeout(() => {
    if (particle.parentNode) {
      particle.style.animation = `pulse-glow ${pulseFreq}s ease-in-out infinite alternate`;
    }
  }, duration * 500); // Start pulsing halfway through movement

  // Reset after animation completes
  setTimeout(() => {
    if (particle.parentNode) {
      particle.style.animation = "none";
      animateParticle(particle);
    }
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

// Initialize particles system
const particlesContainer = document.getElementById("particles-container");

function initParticles() {
  // Create more particles for a richer effect
  const particleCount = window.innerWidth > 768 ? 80 : 50; // More particles on desktop

  for (let i = 0; i < particleCount; i++) {
    createParticle(i);
  }

  // Add interactive particles that respond to mouse movement
  addInteractiveParticles();
}

function addInteractiveParticles() {
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;

    // Create temporary particles near cursor
    if (Math.random() < 0.1) {
      // 10% chance per mouse move
      createTrailParticle(mouseX, mouseY);
    }
  });
}

function createTrailParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "particle particle-trail";

  const size = 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x + (Math.random() * 10 - 5)}%`;
  particle.style.top = `${y + (Math.random() * 10 - 5)}%`;
  particle.style.opacity = 0.8;

  particlesContainer.appendChild(particle);

  // Animate and remove trail particle
  setTimeout(() => {
    particle.style.transition = "all 2s ease-out";
    particle.style.opacity = 0;
    particle.style.transform = `scale(0) rotate(${Math.random() * 360}deg)`;

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2000);
  }, 50);
}

// Start the particles system when page loads
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initCVDownload();
});

// CV Download functionality
function initCVDownload() {
  const cvButton = document.getElementById("cv-download");
  if (cvButton) {
    cvButton.addEventListener("click", downloadCV);
  }
}

function downloadCV() {
  // Create a temporary link element for download
  const link = document.createElement("a");
  link.href = "cv/Enrique_Luna_CV.pdf";
  link.download = "Enrique_Luna_CV.pdf";
  link.style.display = "none";

  // Add to DOM, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Optional: Show a brief feedback to user
  const button = document.getElementById("cv-download");
  const originalText = button.textContent;
  button.textContent = "Downloaded!";
  button.style.background = "linear-gradient(90deg, #28a745, #20c997)";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = "linear-gradient(90deg, #ff3a82, #5233ff)";
  }, 2000);
}
