import { newCircle } from "./newCircle";

const MIN_SIZE = 0.001;
const MAX_SIZE = 0.5;
const MAX_OFFSET = 4;

export function calculatePositionsAndSizes(circles, dt) {
  return circles.map(circle => {
    const r = circle.r + circle.rSpeed * dt;
    const x = circle.x + circle.xSpeed * dt;
    const y = circle.y + circle.ySpeed * dt;

    if (
      r < MIN_SIZE ||
      r > MAX_SIZE ||
      x < -MAX_OFFSET ||
      x > MAX_OFFSET ||
      y < -MAX_OFFSET ||
      y > MAX_OFFSET
    ) {
      return newCircle();
    }

    return {
      ...circle,
      r,
      x,
      y
    };
  });
}
