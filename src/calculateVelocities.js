/**
 * Based on
 * https://css-tricks.com/creating-your-own-gravity-and-space-simulator/
 */

const SOFTENING = 0.15;
const G = 5;

function calculateSingleAcceleration(x1, y1, x2, y2, r) {
  const distX = x2 - x1;
  const distY = y2 - y1;
  const distSquared = distX ** 2 + distY ** 2;
  const force =
    (G * r) / (distSquared + Math.sqrt(distSquared * SOFTENING));
  return [distX * force, distY * force];
}

function calculateAcceleration(circles, centre, { x, y }) {
  return circles.reduce((acc, { r: otherR, x: otherX, y: otherY }) => {
    if (x === otherX && y === otherY) {
      return acc;
    }
    const acc1 = calculateSingleAcceleration(x, y, otherX, otherY, otherR);
    return [acc[0] + acc1[0], acc[1] + acc1[1]];
  }, calculateSingleAcceleration(x, y, centre.x, centre.y, centre.r));
}

export function calculateVelocities(circles, centre, dt) {
  return circles.map(circle => {
    const [aX, aY] = calculateAcceleration(circles, centre, circle);

    const xSpeed = circle.xSpeed + aX * dt;
    const ySpeed = circle.ySpeed + aY * dt;

    return {
      ...circle,
      xSpeed,
      ySpeed
    };
  });
}
