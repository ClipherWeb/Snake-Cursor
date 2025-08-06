const NUM_DOTS = 20;
const SPEED = 0.2;

let dots = [];
let positions = [];


for (let i = 0; i < NUM_DOTS; i++) {
  const dot = document.createElement("div");
  dot.classList.add("snake-dot");
  document.body.appendChild(dot);
  dots.push(dot);
  positions.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
}

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Track mouse position
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop
function animate() {
  // First dot follows the real cursor
  positions[0].x += (mouse.x - positions[0].x) * SPEED;
  positions[0].y += (mouse.y - positions[0].y) * SPEED;

  // Remaining dots follow the previous one
  for (let i = 1; i < NUM_DOTS; i++) {
    positions[i].x += (positions[i - 1].x - positions[i].x) * SPEED;
    positions[i].y += (positions[i - 1].y - positions[i].y) * SPEED;
  }

  // Apply positions to DOM elements
  for (let i = 0; i < NUM_DOTS; i++) {
    dots[i].style.left = positions[i].x + "px";
    dots[i].style.top = positions[i].y + "px";
    dots[i].style.opacity = (1 - i / NUM_DOTS).toFixed(2); // fade tail
    dots[i].style.transform = "translate(-50%, -50%) scale(" + (1 - i / NUM_DOTS * 0.5) + ")";
  }

  requestAnimationFrame(animate);
}

animate();


document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
});
