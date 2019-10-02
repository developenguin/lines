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

  n = 5;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  connectAllPoints(
    getPointsForN(n)
  )

}

function getCanvasCenter() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

function connectAllPoints(points) {

  ctx.strokeStyle = 'white';

  points.forEach(point => {

    points.forEach(otherPoint => {
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
