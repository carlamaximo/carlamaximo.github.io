// Botões Projetos Trybe
const btnPixel = document.querySelector('#btn-pixel');
const btnTarefas = document.querySelector('#btn-tarefas');
const btnTrybewarts = document.querySelector('#btn-trybewarts');

const arrayProjetos = [btnPixel, btnTarefas, btnTrybewarts];

function botaoCima (event) {
  event.target.classList.add('cimaBotao');
}

function botaoSai (event) {
  event.target.classList.remove('cimaBotao');
}

for (let i = 0; i < arrayProjetos.length; i += 1){
  arrayProjetos[i].addEventListener('mouseover', botaoCima);
  arrayProjetos[i].addEventListener('mouseout', botaoSai);
}

// Menu

const projetos = document.getElementById('projetos');
const contato = document.getElementById('contato');
const habilidades = document.getElementById('habilidades');

const arrayMenu = [projetos, contato, habilidades];

function cima (event) {
  event.target.classList.add('cima');
}

function sai (event) {
  event.target.classList.remove('cima');
}


for (let i = 0; i < arrayMenu.length; i += 1){
  arrayMenu[i].addEventListener('mouseover', cima);
  arrayMenu[i].addEventListener('mouseout', sai);
}

