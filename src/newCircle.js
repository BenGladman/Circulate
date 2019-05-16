const startTime = performance.now();

function randomPosition() {
  return Math.random() * 2 - 1;
}

function randomSpeed(min, max) {
  const direction = Math.random() < 0.5 ? -1 : 1;
  const speed = Math.random() * (max - min) + min;
  return speed * direction;
}

function randomHue() {
  const rand = Math.floor(Math.random() * 60);
  const base = Math.floor((performance.now() - startTime) * 0.01);
  return (rand + base) % 360;
}

let circleId = 0;

export function newCircle() {
  return {
    id: circleId++,
    r: Math.random() / 20 + 0.01,
    rSpeed: randomSpeed(0.1, 0.3),
    x: randomPosition(),
    xSpeed: randomSpeed(1, 3),
    y: randomPosition(),
    ySpeed: randomSpeed(1, 3),
    hue: randomHue(startTime),
    lightness: 50,
    alpha: 0
  };
}
