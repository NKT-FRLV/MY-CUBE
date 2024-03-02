// Получаем элемент куба
const cube = document.querySelector('.cube');

// Флаг для отслеживания состояния перемещения
let isDragging = false;

// Переменные для хранения начальных координат
let startX, startY;

// Переменные для хранения скорости вращения куба
let rotationSpeedX = 0;
let rotationSpeedY = 0;

// Коэффициент замедления
const decelerationRate = 0.95;

// Максимальная скорость вращения куба
const maxRotationSpeed = 5;

// Обработчик события нажатия кнопки мыши или касания пальцем
cube.addEventListener('mousedown', startDragging);
cube.addEventListener('touchstart', startDragging);

// Функция для начала перемещения
function startDragging(e) {
  e.preventDefault(); // Предотвращаем стандартное действие браузера
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
  document.addEventListener('mousemove', dragCube);
  document.addEventListener('touchmove', dragCube, { passive: false }); // Пассивный режим выключен
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
}

// Функция для перемещения куба
function dragCube(e) {
  e.preventDefault(); // Предотвращаем стандартное действие браузера
  if (isDragging) {
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    startX = currentX;
    startY = currentY;
    const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
    const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
    cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
    cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
    updateRotationSpeed(deltaX, deltaY);
  }
}

// Функция для завершения перемещения
function stopDragging() {
  isDragging = false;
  decelerateInterval = setInterval(decelerateCube, 16);
  document.removeEventListener('mousemove', dragCube);
  document.removeEventListener('touchmove', dragCube);
}

// Функция для обновления скорости вращения куба
function updateRotationSpeed(deltaX, deltaY) {
  rotationSpeedX = deltaX;
  rotationSpeedY = deltaY;
}

// Функция для замедления вращения куба
function decelerateCube() {
  rotationSpeedX *= decelerationRate;
  rotationSpeedY *= decelerationRate;
  const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
  const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
  cube.style.setProperty('--cube-rotate-x', `${rotateX + rotationSpeedX}deg`);
  cube.style.setProperty('--cube-rotate-y', `${rotateY + rotationSpeedY}deg`);
  if (Math.abs(rotationSpeedX) < 0.1 && Math.abs(rotationSpeedY) < 0.1) {
    clearInterval(decelerateInterval);
  }
}

// Обработчик события начала касания
cube.addEventListener('touchstart', (e) => {
  // Сохраняем начальные координаты касания
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

// Обработчик события перемещения пальца по кубу
cube.addEventListener('touchmove', (e) => {
  // Получаем текущие координаты касания
  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  
  // Вычисляем изменение координат
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  // Применяем изменения к вращению куба
  rotateCube(deltaX, deltaY);

  // Обновляем начальные координаты касания
  startX = currentX;
  startY = currentY;

  // Отменяем стандартное поведение браузера при событии touchmove
  e.preventDefault();
});

// КНОПКА ПАДЕНИЯ МЯЧИКА
const fallButton = document.querySelector('.fall-button');
const view = document.querySelector('.view');

fallButton.addEventListener('click', () => {
  view.classList.add('falling');
});

view.addEventListener('animationend', () => {
  view.classList.remove('falling');
});

// КНОПКА ПУЛЬСАЦИЯ
const pulseButton = document.querySelector('.pulse-button');

pulseButton.addEventListener('click', () => {
  view.classList.toggle('pulse');
});
view.addEventListener('animationend', () => {
  view.classList.remove('pulse');
});