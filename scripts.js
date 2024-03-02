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
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
  document.addEventListener('mousemove', dragCube);
  document.addEventListener('touchmove', dragCube);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
}

// Функция для перемещения куба
function dragCube(e) {
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



// // Получаем элемент куба
// const cube = document.querySelector('.cube');

// // Флаг для отслеживания состояния мыши
// let isDragging = false;

// // Переменные для хранения начальных координат мыши
// let startX, startY;

// // Обработчик события нажатия кнопки мыши
// cube.addEventListener('mousedown', (e) => {
//   // Устанавливаем флаг в значение true
//   isDragging = true;
//   // Сохраняем начальные координаты мыши
//   startX = e.clientX;
//   startY = e.clientY;
//   // Добавляем обработчики событий для перемещения мыши к документу
//   document.addEventListener('mousemove', onMouseMove);
// });

// // Функция обработки события перемещения мыши
// function onMouseMove(e) {
//   // Проверяем, удерживается ли кнопка мыши
//   if (isDragging) {
//     // Вычисляем изменение позиции мыши
//     const deltaX = e.clientX - startX;
//     const deltaY = e.clientY - startY;
//     // Обновляем переменные для следующего события
//     startX = e.clientX;
//     startY = e.clientY;
//     // Получаем текущие значения вращения куба
//     const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
//     const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
//     // Применяем изменения к вращению куба
//     cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
//     cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
//   }
// }

// // Обработчик события отпускания кнопки мыши
// document.addEventListener('mouseup', () => {
//   // Сохраняем текущую скорость вращения куба после отпускания мыши
//   rotationSpeedX = (rotationSpeedX || 0) + Math.random() * 2 - 1;
//   rotationSpeedY = (rotationSpeedY || 0) + Math.random() * 2 - 1;
//   // Сбрасываем флаг в значение false
//   isDragging = false;
//   // Удаляем обработчики событий для перемещения мыши с документа
//   document.removeEventListener('mousemove', onMouseMove);
// });





// // Коэффициент замедления (можно регулировать)
// const decelerationRate = 0.99;
// // Периодичность проверки ускорения (в миллисекундах)
// const updateInterval = (1000 / 60) * 1.8;

// // Переменные для хранения скорости вращения куба
// let rotationSpeedX = 0;
// let rotationSpeedY = 0;

// // Функция для уменьшения скорости вращения куба
// function decelerateCube() {
//   // Проверяем, достигла ли скорость куба минимального значения
//   if (Math.abs(rotationSpeedX) < 0.1 && Math.abs(rotationSpeedY) < 0.1) {
//     // Если да, останавливаем интервальную функцию
//     clearInterval(decelerateInterval);
//   } else {
//     // Иначе уменьшаем скорость куба на коэффициент замедления
//     rotationSpeedX *= decelerationRate;
//     rotationSpeedY *= decelerationRate;
//     // Получаем текущие значения вращения куба
//     let rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
//     let rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
//     // Применяем изменения к вращению куба
//     cube.style.setProperty('--cube-rotate-x', `${rotateX + rotationSpeedX}deg`);
//     cube.style.setProperty('--cube-rotate-y', `${rotateY + rotationSpeedY}deg`);
//   }
// }

// // Обработчик события отпускания кнопки мыши или касания
// function stopRotation() {
//   // Перестаем отслеживать движение куба
//   isDragging = false;
//   // Запускаем интервальную функцию для замедления вращения
//   decelerateInterval = setInterval(decelerateCube, updateInterval);
// }

// // Добавляем обработчики событий для остановки вращения куба
// document.addEventListener('mouseup', stopRotation);
// document.addEventListener('touchend', stopRotation);

// // Обновляем скорость вращения куба при перемещении мыши или касания
// function updateRotationSpeed(e) {
//   // Получаем данные о перемещении
//   const deltaX = e.clientX - startX;
//   const deltaY = e.clientY - startY;
//   // Обновляем скорость вращения куба
//   rotationSpeedX = deltaX;
//   rotationSpeedY = deltaY;
//   // Сохраняем текущие координаты мыши
//   startX = e.clientX;
//   startY = e.clientY;
// }

// // Обработчик события перемещения мыши
// cube.addEventListener('mousemove', (e) => {
//   // Проверяем, удерживается ли кнопка мыши
//   if (isDragging) {
//     updateRotationSpeed(e);
//   }
// });

// // Обработчик события отпускания кнопки мыши
// cube.addEventListener('mouseup', () => {
//   // Сохраняем текущую скорость вращения куба после отпускания мыши
//   rotationSpeedX = (rotationSpeedX || 0) + Math.random() * 2 - 1;
//   rotationSpeedY = (rotationSpeedY || 0) + Math.random() * 2 - 1;
//   // Сбрасываем флаг в значение false
//   isDragging = false;
// });



// // // Обработчик события отпускания пальца на сенсорном устройстве
// // cube.addEventListener('touchend', () => {
// //   // Задаем максимальное значение скорости вращения
// //   const maxRotationSpeed = 5;
// //   // Ограничиваем скорость вращения
// //   rotationSpeedX = Math.max(Math.min(rotationSpeedX, maxRotationSpeed), -maxRotationSpeed);
// //   rotationSpeedY = Math.max(Math.min(rotationSpeedY, maxRotationSpeed), -maxRotationSpeed);
// //   // Сбрасываем флаг в значение false
// //   isDragging = false;
// // });



// // Создаем экземпляр Hammer.js и привязываем его к элементу куба
// const mc = new Hammer(cube);

// // Функция для вращения куба
// function rotateCube(deltaX, deltaY) {
//   // Получаем текущие значения вращения куба
//   const rotateX = parseFloat(cube.style.getPropertyValue('--cube-rotate-x')) || 0;
//   const rotateY = parseFloat(cube.style.getPropertyValue('--cube-rotate-y')) || 0;
//   // Применяем изменения к вращению куба
//   cube.style.setProperty('--cube-rotate-x', `${rotateX + deltaY}deg`);
//   cube.style.setProperty('--cube-rotate-y', `${rotateY + deltaX}deg`);
// }

// // Функция для плавного замедления вращения куба
// function decelerateCube() {
//   // Замедляем скорость вращения куба
//   rotationSpeedX *= 0.95;
//   rotationSpeedY *= 0.95;
//   // Если скорость стала очень маленькой, останавливаем замедление
//   if (Math.abs(rotationSpeedX) < 0.1 && Math.abs(rotationSpeedY) < 0.1) {
//     clearInterval(decelerateInterval);
//   } else {
//     // Вращаем куб
//     rotateCube(rotationSpeedX, rotationSpeedY);
//   }
// }

// // Слушаем событие swipe и обрабатываем его
// mc.on("swipe", function(ev) {
//   // Получаем данные о свайпе
//   const deltaX = ev.deltaX;
//   const deltaY = ev.deltaY;

//   // Вращаем куб на основе смещения свайпа
//   rotateCube(deltaX, deltaY);

//   // Сохраняем скорость вращения куба после свайпа
//   rotationSpeedX = deltaX * 0.1;
//   rotationSpeedY = deltaY * 0.1;

//   // Запускаем замедление вращения куба
//   decelerateInterval = setInterval(decelerateCube, 16);
// });



// // КНОПКА  ПАДЕНИЯ МЯЧИКА
// const fallButton = document.querySelector('.fall-button');
// const view = document.querySelector('.view');

// fallButton.addEventListener('click', () => {
//   view.classList.add('falling');
// });

// view.addEventListener('animationend', () => {
//   view.classList.remove('falling');
// });


// // КНОПКА ПУЛЬСАЦИЯ
// const pulseButton = document.querySelector('.pulse-button');

// pulseButton.addEventListener('click', () => {
//   view.classList.toggle('pulse');
// });
// viewPulse.addEventListener('animationend', () => {
//   view.classList.remove('pulse');
// });
