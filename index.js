const canvas = document.getElementById('app'),
      ctx = canvas.getContext('2d');

let circleRadius,
    n;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

function init() {

  circleRadius = canvas.width > canvas.height
    ? canvas.height / 3
    : canvas.width / 3;

  n = 30;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCenterCircle();
  drawPointsForN(n);

}

function drawCenterCircle() {

  const center = getCanvasCenter();
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.arc(center.x, center.y, circleRadius, 0, Math.PI * 2);
  ctx.stroke();

}

function getCanvasCenter() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

function drawPointsForN(n) {

  const points = getPointsForN(n);

  ctx.fillStyle = 'white';

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

}

function getPointsForN(n) {

  const points = [],
        center = getCanvasCenter(),
        segmentAngle = 2 * Math.PI / n;

  for (let i = 1; i <= n; i++) {
    points.push({
      x: center.x + circleRadius * Math.cos(i * segmentAngle),
      y: center.y + circleRadius * Math.sin(i * segmentAngle)
    });
  }

  return points;

}

window.onload = () => init();
