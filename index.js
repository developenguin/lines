const canvas = document.getElementById('app'),
      ctx = canvas.getContext('2d'),
      pointsInput = document.getElementById('points'),
      colorizeInput = document.getElementById('color');

function registerEventListeners() {

  pointsInput.addEventListener('input', () => redrawCanvas());
  colorizeInput.addEventListener('input', () => redrawCanvas());

  onresize = () => redrawCanvas();

}

function init() {

  redrawCanvas();
  registerEventListeners();

}

function redrawCanvas() {

  const n = getNValue();

  resetCanvas();

  connectAllPoints(
    getPointsForN(n)
  );

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

  points.forEach((point, idx) => {

    ctx.strokeStyle = getColor(idx/points.length, points.length);

    points.forEach((otherPoint, otherIdx) => {

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(otherPoint.x, otherPoint.y);
      ctx.stroke();

    });

  });

}

function getColor(rat, n) {

  const radius = getCircleRadius();

  const a = Math.max(0.03, Math.min(1, (radius * 2 / 80000) * Math.max(1, 5 * (-Math.sqrt(n * 0.5) + 10))));

  if (!colorizeInput.checked) {
    return `rgba(255, 255, 255, ${a})`;
  }

  const r = Math.max(0, Math.min(255, 255 - Math.floor(Math.abs(256 - 768 * rat))));
  const g = Math.max(0, Math.min(255, 255 - Math.floor(Math.abs(512 - 768 * rat))));
  const b = Math.max(0, Math.min(255, Math.floor(Math.abs(384 - 768 * rat)) - 768/6));

  return `rgba(${r}, ${g}, ${b}, ${a})`;

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

function getCircleRadius() {
  return canvas.width > canvas.height
    ? canvas.height / 2.25
    : canvas.width / 2.25;
}

window.onload = () => init();
