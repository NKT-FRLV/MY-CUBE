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
const decelerationRate = 0.95;
// Периодичность проверки ускорения (в миллисекундах)
const updateInterval = 1000 / 60;

// Переменные для хранения скорости вращения куба
let rotationSpeedX = 0