// Habilidades utilizadas
const btnPixel = document.querySelector('#btn-pixel');

function listaHabilidadesPixel() {
  alert('Habilidades utilizadas: HTML5, CSS e JavaScript.');
}

btnPixel.addEventListener('click', listaHabilidadesPixel);

const btnTarefas = document.querySelector('#btn-tarefas');

function listaHabilidadesTarefas() {
  alert('Habilidades utilizadas: HTML5, CSS e JavaScript.');
}

btnTarefas.addEventListener('click', listaHabilidadesTarefas);

// Menu

const projetos = document.getElementById('projetos');
const contato = document.getElementById('contato');
const habilidades = document.getElementById
('habilidades');

const array = [projetos, contato, habilidades];

function cima (event) {
  event.target.classList.add('cima');
}

function sai (event) {
  event.target.classList.remove('cima');
}


for (let i = 0; i < array.length; i += 1){
  array[i].addEventListener('mouseover', cima);
  array[i].addEventListener('mouseout', sai);
}



