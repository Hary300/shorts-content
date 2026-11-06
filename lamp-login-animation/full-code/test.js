const scene = document.getElementById('scene');
const pullHandle = document.getElementById('pull-cord-handle');
const pullPath = document.getElementById('pull-cord-path');
const fireflyLayer = document.getElementById('firefly-layer');
const loginForm = document.getElementById('login-form');

let isLit = false;
let dragging = false;
let startX = 0;
let startY = 0;
let dragX = 0;
let dragY = 0;

function setLamp(lit) {
  isLit = lit;
  scene.classList.toggle('is-lit', isLit);
  if (isLit) createFireflies();
  else fireflyLayer.innerHTML = '';
}

function updateString(x, y) {
  pullPath.setAttribute('d', `M 0 0 L ${x} ${80 + y}`);
}

function resetHandle() {
  pullHandle.style.transform = 'translate(0px, 0px)';
  updateString(0, 0);
}

function pointerDown(e) {
  dragging = true;
  pullHandle.classList.add('is-dragging');
  startX = e.clientX;
  startY = e.clientY;
  dragX = 0;
  dragY = 0;
  pullHandle.setPointerCapture?.(e.pointerId);
}

function pointerMove(e) {
  if (!dragging) return;
  dragX = (e.clientX - startX) * 0.3;
  dragY = Math.max(0, e.clientY - startY) * 0.6;
  dragX = Math.max(-35, Math.min(35, dragX));
  dragY = Math.min(180, dragY);
  pullHandle.style.transform = `translate(${dragX}px, ${dragY}px)`;
  updateString(dragX, dragY);
}

function pointerUp() {
  if (!dragging) return;
  dragging = false;
  pullHandle.classList.remove('is-dragging');

  const pulled = dragY > 30;
  resetHandle();

  if (pulled) setLamp(!isLit);
}

pullHandle.addEventListener('pointerdown', pointerDown);
pullHandle.addEventListener('pointermove', pointerMove);
pullHandle.addEventListener('pointerup', pointerUp);
pullHandle.addEventListener('pointercancel', pointerUp);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFireflies() {
  fireflyLayer.innerHTML = '';

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('span');
    dot.className = 'firefly';

    const size = random(3, 7);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.setProperty('--duration', `${random(35, 65)}s`);
    dot.style.setProperty('--delay', `${random(0, 3)}s`);

    for (let n = 1; n <= 5; n++) {
      dot.style.setProperty(`--x${n}`, `${random(0, 100)}vw`);
      dot.style.setProperty(`--y${n}`, `${random(0, 100)}vh`);
    }

    fireflyLayer.appendChild(dot);
  }
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Add your real login logic here.
});

setLamp(false);
