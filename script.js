const blob = document.getElementById("blob");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");
const menuToggleContainer = document.getElementById("menu-toggle-container");
const menuText = document.getElementById("menu-text");
const menuButton = document.getElementById("menu-toggle");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let isMenuOpen = false;

// Blob follow cursor
document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;
  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
};

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

// Menu functionality - now listens for clicks on both the button and text
menuToggleContainer.addEventListener("click", () => {
  if (!isMenuOpen) {
    menu.classList.add("active");
    menu.classList.remove("closing");
    menuText.textContent = "Close";
    menuButton.classList.add("active");
    isMenuOpen = true;
  } else {
    closeMenu();
  }
});

// Improved menu item click handler
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    if (target) {
      closeMenu().then(() => {
        document.querySelector(target).scrollIntoView({ behavior: "smooth" });
      });
    }
  });
});

// New helper function to close menu with Promise
function closeMenu() {
  return new Promise((resolve) => {
    menu.classList.remove("active");
    menu.classList.add("closing");
    menuText.textContent = "Menu";
    menuButton.classList.remove("active");
    isMenuOpen = false;

    setTimeout(() => {
      menu.classList.remove("closing");
      resolve();
    }, 500); // Match this with your CSS animation duration
  });
}
