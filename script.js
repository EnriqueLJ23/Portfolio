const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");
const menuToggleContainer = document.getElementById("menu-toggle-container");
const menuText = document.getElementById("menu-text");
const menuButton = document.getElementById("menu-toggle");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let isMenuOpen = false;

// Create particle effect
const particlesContainer = document.getElementById("particles-container");
const particleCount = 80;

// Create particles immediately when page loads
for (let i = 0; i < particleCount; i++) {
  createParticle(i);
}

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
