// Dark mode toggle with persistence
const darkToggle = document.getElementById('darkToggle');
const root = document.documentElement;

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    root.classList.add('dark-mode');
  } else if (saved === 'light') {
    root.classList.remove('dark-mode');
  } else {
    // If no saved theme, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}

loadTheme();

darkToggle.addEventListener('click', () => {
  root.classList.toggle('dark-mode');
  if (root.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Preloader fadeout
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("hidden");
    setTimeout(() => (preloader.style.display = "none"), 300);
  });

  // Hamburger menu toggle
  const burgerBtn = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("nav-links");
  burgerBtn.addEventListener("click", () => {
    const expanded = burgerBtn.getAttribute("aria-expanded") === "true" || false;
    burgerBtn.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
  });

  // Dark mode toggle
  const darkToggle = document.getElementById("darkToggle");
  darkToggle.addEventListener("click", () => {
    const html = document.documentElement;
    if (html.classList.contains("dark-mode")) {
      html.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  });

  // Load theme on page load
  (function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark-mode");
    }
  })();

  // Map modal toggle
  const showMapBtn = document.getElementById("showMapBtn");
  const mapModal = document.getElementById("mapModal");
  const modalClose = mapModal.querySelector(".modal-close");

  showMapBtn.addEventListener("click", () => {
    mapModal.style.display = "flex";
    mapModal.setAttribute("aria-hidden", "false");
    mapModal.focus();
  });
  modalClose.addEventListener("click", () => {
    mapModal.style.display = "none";
    mapModal.setAttribute("aria-hidden", "true");
    showMapBtn.focus();
  });
  mapModal.addEventListener("click", (e) => {
    if (e.target === mapModal) {
      mapModal.style.display = "none";
      mapModal.setAttribute("aria-hidden", "true");
      showMapBtn.focus();
    }
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove("hidden");
    } else {
      backToTop.classList.add("hidden");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Fade-in sections on scroll
  const fadeElements = document.querySelectorAll(".fade-in");
  function checkFade() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", checkFade);
  checkFade();

  // Three.js particles background animation
  const canvas = document.getElementById("webgl-canvas");

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Scene and Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particles
  const particlesCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.07,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0015;
    points.rotation.x += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

// Modal for Universiti Malaysia Perlis map
const showMapBtn = document.getElementById('showMapBtn');
const modal = document.getElementById('mapModal');
const closeBtn = modal.querySelector('.modal-close');

showMapBtn.addEventListener('click', () => {
  modal.classList.add('active');
  showMapBtn.setAttribute('aria-expanded', 'true');
  modal.setAttribute('tabindex', '-1');
  modal.focus();
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  showMapBtn.setAttribute('aria-expanded', 'false');
  showMapBtn.focus();
});

// Close modal on clicking outside modal-content
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    showMapBtn.setAttribute('aria-expanded', 'false');
    showMapBtn.focus();
  }
});

// Close modal on Escape key press
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    showMapBtn.setAttribute('aria-expanded', 'false');
    showMapBtn.focus();
  }
});

// Contact form validation (basic example)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (name.length < 3) {
      formMessage.textContent = 'Name must be at least 3 characters.';
      formMessage.style.color = 'red';
      contactForm.name.focus();
      return;
    }

    if (!validateEmail(email)) {
      formMessage.textContent = 'Please enter a valid email.';
      formMessage.style.color = 'red';
      contactForm.email.focus();
      return;
    }

    if (message.length < 10) {
      formMessage.textContent = 'Message must be at least 10 characters.';
      formMessage.style.color = 'red';
      contactForm.message.focus();
      return;
    }

    // If all good, reset form and show success message
    formMessage.textContent = 'Thank you! Your message has been sent.';
    formMessage.style.color = 'green';
    contactForm.reset();
  });
}

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("darkToggle");
  const theme = localStorage.getItem("theme") 
        || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  if (theme === "dark") document.body.classList.add("dark-mode");

  darkBtn.onclick = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  };

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert("Terima kasih! Borang anda telah dihantar 😊");
      form.reset();
    });
  });

  document.querySelectorAll('.fade-in').forEach(el =>
    el.classList.add('appear')
  );
});
// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl-canvas'),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

// Cube geometry and material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
  roughness: 0.5,
  metalness: 0.7,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
// Setup scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl-canvas'),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

camera.position.z = 40;

// Create particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const scales = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 80;  // x
  positions[i * 3 + 1] = (Math.random() - 0.5) * 40;  // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 80;  // z
  scales[i] = Math.random();
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

// Create particle material (glowing points)
const sprite = new THREE.TextureLoader().load(
  'https://threejs.org/examples/textures/sprites/disc.png'
);

const material = new THREE.PointsMaterial({
  size: 1.5,
  map: sprite,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
  color: 0x00aaff,
});

// Create particle system
const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

// Animate wave effect
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  const positions = particleSystem.geometry.attributes.position.array;

  for (let i = 0; i < particleCount; i++) {
    const ix = i * 3;
    // Wave motion on y axis based on x and time
    positions[ix + 1] =
      10 * Math.sin(0.3 * positions[ix] + time) + 5 * Math.cos(0.5 * positions[ix + 2] + time * 1.5);
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;

  particleSystem.rotation.y += 0.002;

  renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById('darkToggle');

darkToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  if (document.documentElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// ===== MODAL MAP CONTROL =====
const showMapBtn = document.getElementById('showMapBtn');
const mapModal = document.getElementById('mapModal');
const modalCloseBtn = document.querySelector('.modal-close');

showMapBtn.addEventListener('click', () => {
  mapModal.classList.add('active');
  mapModal.focus();
});

modalCloseBtn.addEventListener('click', () => {
  mapModal.classList.remove('active');
  showMapBtn.focus();
});

// Close modal on outside click
mapModal.addEventListener('click', (e) => {
  if (e.target === mapModal) {
    mapModal.classList.remove('active');
    showMapBtn.focus();
  }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && mapModal.classList.contains('active')) {
    mapModal.classList.remove('active');
    showMapBtn.focus();
  }
});

---

## 3. **scripts.js** (JavaScript)

```js
// Toggle Dark Mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Filter Portfolio Items
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
        setTimeout(() => item.classList.add("revealed"), 10);
      } else {
        item.style.display = "none";
        item.classList.remove("revealed");
      }
    });
  });
});

// Lightbox Functionality
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
  });

  item.addEventListener("keypress", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightboxClose.click();
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    lightboxClose.click();
  }
});

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
const icon = darkToggle.querySelector('i');
const body = document.body;

if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.classList.contains(filter);
      item.style.display = match ? 'block' : 'none';
      if (match) setTimeout(() => item.classList.add('revealed'), 10);
      else item.classList.remove('revealed');
    });
  });
});

window.addEventListener('load', () => {
  portfolioItems.forEach((item, i) => {
    setTimeout(() => item.classList.add('revealed'), i * 100);
  });
});

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });

  item.addEventListener('keypress', e => {
    if (e.key === 'Enter') item.click();
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightboxClose.click();
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightboxClose.click();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('webgl-canvas');
  initWebGLCanvas(canvas);
});
// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");
  setTimeout(() => preloader.style.display = "none", 500);
});

// Navbar burger toggle
const burger = document.getElementById("burgerBtn");
const navLinks = document.getElementById("nav-links");
burger.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", !expanded);
  navLinks.classList.toggle("active");
});

// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Back to top button
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Map modal open/close
const showMapBtn = document.getElementById("showMapBtn");
const mapModal = document.getElementById("mapModal");
const mapCloseBtn = mapModal.querySelector(".modal-close");

showMapBtn.addEventListener("click", () => {
  mapModal.classList.remove("modal-hidden");
  mapModal.focus();
});
mapCloseBtn.addEventListener("click", () => {
  mapModal.classList.add("modal-hidden");
  showMapBtn.focus();
});
mapModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mapModal.classList.add("modal-hidden");
    showMapBtn.focus();
  }
});

// Video popup open/close
const videoPopupBtn = document.getElementById("videoPopupBtn");
const videoPopup = document.getElementById("videoPopup");
const videoCloseBtn = document.getElementById("videoCloseBtn");
const introVideo = document.getElementById("introVideo");

videoPopupBtn.addEventListener("click", () => {
  videoPopup.classList.remove("video-popup-hidden");
  introVideo.play();
  videoPopup.focus();
});
videoCloseBtn.addEventListener("click", () => {
  videoPopup.classList.add("video-popup-hidden");
  introVideo.pause();
  videoPopupBtn.focus();
});
videoPopup.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    videoPopup.classList.add("video-popup-hidden");
    introVideo.pause();
    videoPopupBtn.focus();
  }
});

// Particle animation (simple floating circles) on canvas
const canvas = document.getElementById("webgl-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const maxParticles = 80;

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < maxParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      opacity: Math.random() * 0.5 + 0.3,
    });
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,123,255,${p.opacity})`;
    ctx.shadowColor = 'rgba(0,123,255,0.7)';
    ctx.shadowBlur = 6;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
    if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
  });
  requestAnimationFrame(animate);
}
animate();

