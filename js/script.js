"use strict";

// DOM Elements
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("nav-links");
const darkToggle = document.getElementById("darkToggle");
const backToTopBtn = document.getElementById("backToTop");
const preloader = document.getElementById("preloader");

// Toggle mobile menu
burgerBtn.addEventListener("click", () => {
  const expanded = burgerBtn.getAttribute("aria-expanded") === "true" || false;
  burgerBtn.setAttribute("aria-expanded", !expanded);
  navLinks.classList.toggle("show");
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Back to top button behavior
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Preloader hide on window load
window.addEventListener("load", () => {
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 500);
  }
});

// --- 3D Hero Animation using Three.js ---
function initHero3D() {
  const container = document.getElementById("hero3d-container");
  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Cube Geometry and Material
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x007bff,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x004080,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Responsive
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

initHero3D();
<script>
  const darkToggle = document.getElementById('darkToggle');

  function updateIcon() {
    const icon = document.createElement('i');
    icon.className = document.documentElement.classList.contains('dark-mode')
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
    darkToggle.innerHTML = '';
    darkToggle.appendChild(icon);
  }

  // Set theme from localStorage or system preference
  const theme = localStorage.getItem('theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }

  updateIcon();

  darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
    );
    updateIcon();
  });
</script>
