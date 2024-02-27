document.addEventListener('DOMContentLoaded', function() {
  const cube = document.querySelector('.cube');
  const rangeX = document.querySelector('input[name="cube-rotate-x"]');
  const rangeY = document.querySelector('input[name="cube-rotate-y"]');

  function rotateCube() {
      const rotateXValue = rangeX.value;
      const rotateYValue = rangeY.value;
      cube.style.setProperty('--cube-rotate-x', `${rotateXValue}deg`);
      cube.style.setProperty('--cube-rotate-y', `${rotateYValue}deg`);
  }

  rangeX.addEventListener('input', rotateCube);
  rangeY.addEventListener('input', rotateCube);
});