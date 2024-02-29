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
});

// Обработчик события перемещения мыши
cube.addEventListener('mousemove', (e) => {
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
});

// Обработчик события отпускания кнопки мыши
cube.addEventListener('mouseup', () => {
  // Сбрасываем флаг в значение false
  isDragging = false;
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
const decelerationRate = 0.95;
// Периодичность проверки ускорения (в миллисекундах)
const updateInterval = 1000 / 60;

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
