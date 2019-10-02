const canvas = document.getElementById('app'),
      ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

function init() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = () => init();
