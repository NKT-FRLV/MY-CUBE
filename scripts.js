
// Получаем элемент куба
const cube = document.querySelector('.cube');

// Флаг для отслеживания состояния мыши
let isDragging = false;

// Переменные для хранения начальных координат мыши
let startX, startY;

// Обработчик события нажатия кнопки мыши
cube.addEventListener('mousedown', (e) => {
  // Устанавливаем флаг в значение true
  isDragging = true;
  // Сохраняем начальные координаты мыши
  startX = e.clientX;
  startY = e.clientY;
  // Добавляем обработчики событий для перемещения мыши к документу
  document.addEventListener('mousemove', onMouseMove);
});

// Функция обработки события перемещения мыши
function onMouseMove(e) {
  // Проверяем, удерживается ли кнопка мыши
  if (isDragging) {
    // Вычисляем изменение позиции мыши
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    // Обновляем переменные для следующего события
    startX = e.clientX;
    startY = e.clientY;
    // Получаем текущие значения вращения куба
    const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
    const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
    // Применяем изменения к вращению куба
    cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
    cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
  }
}

// Обработчик события отпускания кнопки мыши
document.addEventListener('mouseup', () => {
  // Сохраняем текущую скорость вращения куба после отпускания мыши
  rotationSpeedX = (rotationSpeedX || 0) + Math.random() * 2 - 1;
  rotationSpeedY = (rotationSpeedY || 0) + Math.random() * 2 - 1;
  // Сбрасываем флаг в значение false
  isDragging = false;
  // Удаляем обработчики событий для перемещения мыши с документа
  document.removeEventListener('mousemove', onMouseMove);
});


// Обработчик события начала касания
cube.addEventListener('touchstart', (e) => {
  // Отменяем стандартное поведение события
  e.preventDefault();
  // Получаем данные о касании
  const touch = e.touches[0];
  // Сохраняем начальные координаты касания
  startX = touch.clientX;
  startY = touch.clientY;
});

// Обработчик события перемещения касания
cube.addEventListener('touchmove', (e) => {
  // Отменяем стандартное поведение события
  e.preventDefault();
  // Получаем данные о касании
  const touch = e.touches[0];
  // Вычисляем изменение позиции касания
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  // Обновляем начальные координаты касания
  startX = touch.clientX;
  startY = touch.clientY;
  // Получаем текущие значения вращения куба
  const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
  const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
  // Применяем изменения к вращению куба
  cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
  cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
});


// Коэффициент замедления (можно регулировать)
const decelerationRate = 0.99;
// Периодичность проверки ускорения (в миллисекундах)
const updateInterval = (1000 / 60) * 1.8;

// Переменные для хранения скорости вращения куба
let rotationSpeedX = 0;
let rotationSpeedY = 0;

// Функция для уменьшения скорости вращения куба
function decelerateCube() {
  // Проверяем, достигла ли скорость куба минимального значения
  if (Math.abs(rotationSpeedX) < 0.1 && Math.abs(rotationSpeedY) < 0.1) {
    // Если да, останавливаем интервальную функцию
    clearInterval(decelerateInterval);
  } else {
    // Иначе уменьшаем скорость куба на коэффициент замедления
    rotationSpeedX *= decelerationRate;
    rotationSpeedY *= decelerationRate;
    // Получаем текущие значения вращения куба
    let rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
    let rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
    // Применяем изменения к вращению куба
    cube.style.setProperty('--cube-rotate-x', `${rotateX + rotationSpeedX}deg`);
    cube.style.setProperty('--cube-rotate-y', `${rotateY + rotationSpeedY}deg`);
  }
}

// Обработчик события отпускания кнопки мыши или касания
function stopRotation() {
  // Перестаем отслеживать движение куба
  isDragging = false;
  // Запускаем интервальную функцию для замедления вращения
  decelerateInterval = setInterval(decelerateCube, updateInterval);
}

// Добавляем обработчики событий для остановки вращения куба
document.addEventListener('mouseup', stopRotation);
document.addEventListener('touchend', stopRotation);

// Обновляем скорость вращения куба при перемещении мыши или касания
function updateRotationSpeed(e) {
  // Получаем данные о перемещении
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;
  // Обновляем скорость вращения куба
  rotationSpeedX = deltaX;
  rotationSpeedY = deltaY;
  // Сохраняем текущие координаты мыши
  startX = e.clientX;
  startY = e.clientY;
}

// Обработчик события перемещения мыши
cube.addEventListener('mousemove', (e) => {
  // Проверяем, удерживается ли кнопка мыши
  if (isDragging) {
    updateRotationSpeed(e);
  }
});

// Обработчик события перемещения касания
cube.addEventListener('touchmove', (e) => {
  // Получаем данные о касании
  const touch = e.touches[0];
  updateRotationSpeed(touch);
});

// Обработчик события отпускания кнопки мыши
cube.addEventListener('mouseup', () => {
  // Сохраняем текущую скорость вращения куба после отпускания мыши
  rotationSpeedX = (rotationSpeedX || 0) + Math.random() * 2 - 1;
  rotationSpeedY = (rotationSpeedY || 0) + Math.random() * 2 - 1;
  // Сбрасываем флаг в значение false
  isDragging = false;
});

// Обработчик события перемещения касания
cube.addEventListener('touchmove', (e) => {
  // Отменяем стандартное поведение события
  e.preventDefault();
  // Получаем данные о касании
  const touch = e.touches[0];
  // Вычисляем изменение позиции касания
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  // Обновляем начальные координаты касания
  startX = touch.clientX;
  startY = touch.clientY;
  // Получаем текущие значения вращения куба
  const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
  const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
  // Применяем изменения к вращению куба
  cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
  cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
});

// Обработчик события отпускания пальца на сенсорном устройстве
cube.addEventListener('touchend', () => {
  // Задаем максимальное значение скорости вращения
  const maxRotationSpeed = 5;
  // Ограничиваем скорость вращения
  rotationSpeedX = Math.max(Math.min(rotationSpeedX, maxRotationSpeed), -maxRotationSpeed);
  rotationSpeedY = Math.max(Math.min(rotationSpeedY, maxRotationSpeed), -maxRotationSpeed);
  // Сбрасываем флаг в значение false
  isDragging = false;
});



// КНОПКА  ПАДЕНИЯ МЯЧИКА
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
viewPulse.addEventListener('animationend', () => {
  view.classList.remove('pulse');
});
