// Creating pixels grid by JS
// Requirement 4
const pixelBoard = document.getElementById('pixel-board');
function pixelGrid(input) {
  for (let rows = 0; rows < input; rows += 1) {
    const row = document.createElement('section');

    for (let columns = 0; columns < input; columns += 1) {
      const pixels = document.createElement('div');

      pixels.classList.add('pixel');
      row.appendChild(pixels);
    }
    pixelBoard.appendChild(row);
  }
}
pixelGrid(5);
// Requirement 06
document.getElementById('black').classList.add('selected');

// Requirement 07
function selectedColor(currentColor) {
  const lastColorSelected = document.querySelector('.selected');
  lastColorSelected.classList.remove('selected');
  currentColor.target.classList.add('selected');
}
const colorPallete = document.getElementById('color-palette');
colorPallete.addEventListener('click', selectedColor);

// Requirement 08 - Thanks to Filipe Brochier for your help!
function paint(event) {
  event.target.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
}
pixelBoard.addEventListener('click', paint);

// Requirement 09
const btnClear = document.getElementById('clear-board');
btnClear.innerText = 'Limpar';

function clearBoard() {
  const square = document.querySelectorAll('.pixel');
  for (let i = 0; i < square.length; i += 1) {
    square[i].style.backgroundColor = null;
  }
}

btnClear.addEventListener('click', clearBoard);

// Requirement 09
const BoardBtn = document.getElementById('generate-board');
const inputBoard = document.getElementById('board-size');

function sizeMinMax(input) {
  if (input < 5 && input > 0) {
    input = 5;
    alert('O tamanho mínimo é 5.');
  } else
  if (input > 50) {
    input = 50;
    alert('O tamanho máximo é 50.');
  } else {
    return input;
  }
  // if (input >= 5 && input <= 50) {

  // }
  return input;
}

function btnVQV() {
  const inputValue = inputBoard.value;
  if (inputBoard.value === '') {
    window.alert('Board inválido!');
  }
  const newBoard = sizeMinMax(inputValue);
  pixelBoard.innerHTML = '';
  return pixelGrid(newBoard);
}

BoardBtn.addEventListener('click', btnVQV);

// Requirement 12
// From: https://www.ti-enxame.com/pt/javascript/gerador-de-cores-aleatorias/967183954/
function generateColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const rgb = `rgb(${red}, ${green}, ${blue})`;
  return rgb;
}

function changeColors() {
  const colors = document.getElementsByClassName('color');

  for (let i = 0; i < colors.length; i += 1) {
    const color = colors[i];
    if (color !== colors[0]) {
      color.style.backgroundColor = generateColor();
    }
  }
}
changeColors();
