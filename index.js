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
        segmentAngle = 2 * Math.PI / n,
        circleRadius = canvas.width > canvas.height
          ? canvas.height / 2.5
          : canvas.width / 2.5;

  for (let i = 1; i <= n; i++) {
    points.push({
      x: center.x + circleRadius * Math.cos(i * segmentAngle),
      y: center.y + circleRadius * Math.sin(i * segmentAngle)
    });
  }

  return points;

}

window.onload = () => init();
