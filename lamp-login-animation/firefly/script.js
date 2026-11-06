const fireflyLayer = document.getElementById('firefly-layer');

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

createFireflies();
