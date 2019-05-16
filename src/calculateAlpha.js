export function calculateAlpha(circles, dt) {
  return circles.map(circle => {
    const { alpha, r } = circle;
    const idealAlpha = r < 0.1 ? 0.9 : r > 0.4 ? 0 : 0.2;
    if (alpha === idealAlpha) {
      return circle;
    }
    const direction = alpha < idealAlpha ? 1 : -1;
    const newAlpha = alpha + direction * dt * 2;
    const newDirection = alpha < idealAlpha ? 1 : -1;
    if (direction === newDirection) {
      return {
        ...circle,
        alpha: newAlpha
      };
    }
    return {
      ...circle,
      alpha: idealAlpha
    };
  });
}
