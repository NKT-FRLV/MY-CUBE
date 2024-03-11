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

// Обработчик события начала перемещения
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
    rotateCube(deltaX, deltaY);
    updateRotationSpeed(deltaX, deltaY);
  }
}

// Функция для завершения перемещения
function stopDragging() {
  isDragging = false;
  document.removeEventListener('mousemove', dragCube);
  document.removeEventListener('touchmove', dragCube);
}

// Функция для обновления скорости вращения куба
function updateRotationSpeed(deltaX, deltaY) {
  rotationSpeedX = deltaX;
  rotationSpeedY = deltaY;
}

// Функция для вращения куба
function rotateCube(deltaX, deltaY) {
  // Получаем текущие значения углов вращения
  const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
  const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;

  // Вычисляем новые значения углов вращения
  const newRotateX = rotateX + deltaY;
  const newRotateY = rotateY + deltaX;

  // Применяем новые значения углов вращения куба
  cube.style.setProperty('--cube-rotate-x', `${newRotateX}deg`);
  cube.style.setProperty('--cube-rotate-y', `${newRotateY}deg`);
}

// Функция для анимации куба с использованием requestAnimationFrame
function animateCube() {
  // Замедляем скорость вращения куба
  rotationSpeedX *= decelerationRate;
  rotationSpeedY *= decelerationRate;

  // Применяем скорость вращения куба
  rotateCube(rotationSpeedX, rotationSpeedY);

  // Вызываем requestAnimationFrame для следующего кадра анимации
  requestAnimationFrame(animateCube);
}

// Начинаем анимацию куба
animateCube();

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


// КНОПКА FIRE-BOLL
const fireBollButton = document.querySelector('.fire-button');
const fireVideo = document.querySelector('.fire-video');

fireBollButton.addEventListener('click', () => {
  fireVideo.classList.toggle('fire');
});
fireVideo.addEventListener('animationend', () => {
  fireVideo.classList.remove('fire');
});

// КНОПКА stars
const starsButton = document.querySelector('.star-button');
const svgStar = document.querySelector('.gran-svg');

starsButton.addEventListener('click', () => {
  svgStar.classList.add('stars');
  
  // Устанавливаем таймер
  const timer = setTimeout(() => {
      svgStar.classList.remove('stars');
  }, 10000);
  
  starsButton.addEventListener("click", () => {
      // Если кнопка была нажата до истечения таймера, то отменяем его
      clearTimeout(timer);
  });
});