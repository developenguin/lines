const canvas = document.getElementById('app'),
      ctx = canvas.getContext('2d'),
      pointsInput = document.getElementById('points');

function registerEventListeners() {

  pointsInput.addEventListener('change', () => {

    resetCanvas();

    const n = getNValue();

    connectAllPoints(
      getPointsForN(n)
    );

  });

  onresize = () => init();

}

function init() {

  const n = getNValue();

  resetCanvas();

  connectAllPoints(
    getPointsForN(n)
  );

  registerEventListeners();

}

function getNValue() {

  const n = parseInt(pointsInput.value, 10);

  document.getElementById('points-label').innerText = `${n}`;

  return n;

}

function resetCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function getCanvasCenter() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

function connectAllPoints(points) {

  const colors = getColorsForN(points.length);
  ctx.strokeStyle = `rgba(255, 255, 255, ${1/(points.length/10)})`;



  points.forEach((point, idx) => {

    const color = colors[idx % colors.length];
    ctx.strokeStyle = `hsla(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`;

    points.forEach((otherPoint, otherIdx) => {

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(otherPoint.x, otherPoint.y);
      ctx.stroke();

    });

  });

}

function getPointsForN(n) {

  const points = [],
        center = getCanvasCenter(),
        segmentAngleRadian = 2 * Math.PI / n,
        circleRadius = getCircleRadius();

  for (let i = 1; i <= n; i++) {
    points.push({
      x: center.x + circleRadius * Math.cos(i * segmentAngleRadian),
      y: center.y + circleRadius * Math.sin(i * segmentAngleRadian)
    });
  }

  return points;

}

function getColorsForN(n) {

  const segmentAngleDegrees = 2 * Math.PI / n * 180 / Math.PI,
        colors = [];

  for (let i = 1; i <= n; i++) {
    colors.push({
      h: i * segmentAngleDegrees,
      s: 100 / i,
      l: 0.5
    });
  }

  return colors;

}

function getCircleRadius() {
  return canvas.width > canvas.height
    ? canvas.height / 2.5
    : canvas.width / 2.5;
}

window.onload = () => init();
