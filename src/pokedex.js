//local de onde estão guardadas as imagens usadas para os tipos
import { type } from '../data/data.js';
//Conjunto de divs que irão receber um tipo de pokémon cada
const cadaTipo = document.getElementsByClassName('form-check');
//aside onde ficarão as informações de tipo para serem selecionadas
const buscaPorTipo = document.getElementById('barra-de-rolagem');
//input onde poderá ser digitado o nome de um pokémon
const inputInsereNome = document.getElementById('input-search-one-pokemon');
//Botão que aciona evento de procurar pokémon pelo nome inserido em input
const buttonInput = document.getElementById('btn-search-one-pokemon');
//<ul> que receberá as li de cada pokémon (é let para ser apagada e recriada)
let areaPrincipal = document.getElementById('info-Pokemon');
//<li> criada para exibir cada pokémon
const cadaPokemonEscolhido = document.getElementsByClassName('li-pokemon');
//<article> que é o pai da <ul>, que será apagada para limpar pokémons selecionados
const article = document.getElementById('info');
//Botão que aciona evento de procurar pokémon por geração
const butonGeneration = document.getElementById('btn-search-by-generation');
//Botão que aciona evento de procurar pokémon por lista de nomes
const buttonNameSelect = document.getElementById('btn-search-by-name');
//<select> que contém os nomes de todos os pokémon
const selectByName = document.getElementById('name-selected');
//<select> que contém as gerações de todos os pokémon
const selectByGeneration = document.getElementById('generation-selected');

const titleSection = document.getElementById('title-section');

const buttonSearchType = document.getElementById('btn-search-by-Type');

const aside = document.getElementById('search-By-Type');

const imagensLaterais = ['../imagens/lateral/ash.jpg','../imagens/lateral/milotic.jpg','../imagens/lateral/dratini.jpg', '../imagens/lateral/umbreon.jpg', '../imagens/lateral/chandelure.jpg' ];

let quantidade = 0;


function geraNomeComPrimeiraLetraMaiuscula(nome) {
  let nomeAlterado = nome[0].toUpperCase();
  for (let i = 1; i < nome.length; i += 1) {
    nomeAlterado += nome[i].toLowerCase();
  }
  return nomeAlterado;
}
//gera da api todos os nomes dos pokémon existentes
// for (let i = 1; i <= 898; i += 1) {
//   titleSection.innerText = `Bem Vindo! Abaixo, listamos todos os ${i} Pokémon!`
//   fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     .then((resposta) => resposta.json())
//     .then((respostaJson) => {
//       const objetoPokemon = geraObjetoPokemon(respostaJson);
//       const pokemon = document.createElement('option');
//       pokemon.value = respostaJson.name;
//       pokemon.innerText = `${respostaJson.id} - ${geraNomeComPrimeiraLetraMaiuscula(respostaJson.name)}`;
//       selectByName.appendChild(pokemon);
//       acrescentaPokemon(objetoPokemon);
//     })
//     .catch()
// }
//Cria cada tipo de pokémon na barra lateral
type.forEach((tipo) => {
  //cria de div para cada tipo que será exibido
  const newDiv = document.createElement('scroll-page');
  newDiv.setAttribute('class', 'form-check mb-3');
  newDiv.setAttribute('id', tipo.id);
  //cria imagem para cada tipo
  const newImage = document.createElement('img');
  newImage.src = tipo.image;
  newImage.alt = `Imagem do tipo ${tipo.tipo}`;
  newImage.setAttribute('class', 'type-pokemon-image py-1');
  newImage.style.width = '40px';
  //cria label com nome de cada tipo
  const newLabel = document.createElement('label');
  newLabel.setAttribute('class', 'form-check-label mx-3');
  newLabel.innerText = tipo.tipo;
  newLabel.style.color = 'white';
  newLabel.style.textShadow = '0.1em 0.1em black';
  newLabel.style.fontSize = '18px';
  //acrescenta para cada pai um filho
  newDiv.appendChild(newImage);
  newDiv.appendChild(newLabel);
  buscaPorTipo.appendChild(newDiv);

  newDiv.addEventListener('mouseover', () => newDiv.style.backgroundColor = '#53549e');
  newDiv.addEventListener('mouseout', () => newDiv.style.backgroundColor = 'transparent');
});

imagensLaterais.forEach((link) => {
  const divLateral = document.createElement('div');
  divLateral.setAttribute('class', 'divLateral');
  const imagemLateral = document.createElement('img');
  imagemLateral.src = link;
  imagemLateral.setAttribute('class', 'imgLateral');
  divLateral.appendChild(imagemLateral);
  aside.appendChild(divLateral);
});

//cria elementos que serão exibidos no html
function acrescentaPokemon(objeto) {
  const tiposOrdenados = objeto.type.sort();
  //Cri li que terá todas as informações de um pokémon
  const novoPokemon = document.createElement('li');
  novoPokemon.setAttribute('class', 'li-pokemon');
  novoPokemon.textDecoration = 'none';
  //cria parágrafo com nome e número do Pokémon
  const nomeMaiusculo = geraNomeComPrimeiraLetraMaiuscula(objeto.nome);
  const pNamePokemon = document.createElement('p');
  pNamePokemon.innerText = `${objeto.id} - ${nomeMaiusculo}`;
  //cria imagem para o pokémon
  const imagePokemon = document.createElement('img');
  imagePokemon.src = objeto.imagem[0];
  imagePokemon.setAttribute('class', 'image-li-pokemon');
  imagePokemon.style.width = '150px';
  imagePokemon.alt = `Imagem do ${objeto.nome}`;
  //cria div que terá os tipos do pokémon
  const divImgType = document.createElement('div');
  divImgType.setAttribute('id', 'divImgType');
  //cria imagem para cada tipo de pokémon
  tiposOrdenados.forEach((tipo) => {
    const imgType = document.createElement('img');
    imgType.setAttribute('class', 'pokemon-image-type');
    imgType.src = `../imagens/type-logo/${tipo}.png`;
    divImgType.appendChild(imgType);
  });
  //acrescenta para cada pai um filho
  novoPokemon.appendChild(pNamePokemon);
  novoPokemon.appendChild(imagePokemon);
  novoPokemon.appendChild(divImgType);
  areaPrincipal.appendChild(novoPokemon);
}
//Percorre array de tipos de um pokémon e adiciona em um array o nome de cada um deles
function geraArraydeTipos(responseJson) {
  const arrayTipos = [];
  responseJson.types.forEach((nomeTipo) => {
    arrayTipos.push(nomeTipo.type.name);
  });
  return arrayTipos;
}
//remove elemento <ul> completo e cria um novo
function removeElementos() {
  areaPrincipal.parentNode.removeChild(areaPrincipal);
  areaPrincipal = document.createElement('ul');
  areaPrincipal.setAttribute('id', 'info-Pokemon');
  article.appendChild(areaPrincipal);
}
//cria objeto para cada Pokémon
function geraObjetoPokemon(responseJson) {
  const dadosPokemon = {
    nome: responseJson.name,
    imagem: [responseJson.sprites.front_default, responseJson.sprites.back_default, responseJson.sprites.front_shiny, responseJson.sprites.back_shiny],
    id: responseJson.id,
    type: geraArraydeTipos(responseJson, responseJson.types.length),
  };
  return dadosPokemon;
}
//Acessa API, cria objeto que será manipulado e exibe chama função que cria o elemento no html
function acessaApi(nome) {
  if (typeof (nome) === 'string') nome = nome.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then((response) => response.json())
    .then((responseJson) => {
      const objetoPokemon = geraObjetoPokemon(responseJson);
      acrescentaPokemon(objetoPokemon);
    })
    .catch();
}
//Cria loop de exibição de pokémon em que o # se encontra dentro do intervalo de números da geração
function geraPorGeracao(n1, n2, gen) {
  for (let i = n1; i <= n2; i += 1) {
    quantidade += 1;
    titleSection.innerText = `Total de Pokémon da ${gen} Geração: ${quantidade}`;
    acessaApi(i);
  }
}
//Evento criado para pegar o que for digitado no input
buttonInput.addEventListener('click', () => {
  removeElementos();
  titleSection.innerText = geraNomeComPrimeiraLetraMaiuscula(inputInsereNome.value);
  acessaApi(inputInsereNome.value, acrescentaPokemon);
  inputInsereNome.value = '';
});
//Evento criado para pegar o que for selecionado na lista de nomes
buttonNameSelect.addEventListener('click', () => {
  removeElementos();
  const nomeSelected = selectByName.options[selectByName.selectedIndex].value;
  titleSection.innerText = geraNomeComPrimeiraLetraMaiuscula(nomeSelected);
  acessaApi(nomeSelected);
});
//Evento criado para pegar a geração escolhida
butonGeneration.addEventListener('click', () => {
  removeElementos();
  quantidade = 0;
  const valorSelect = selectByGeneration.options[selectByGeneration.selectedIndex].value;
  switch (valorSelect) {
    case '1':
      geraPorGeracao(1, 151, 'Primeira');
      break;
    case '2':
      geraPorGeracao(152, 251, 'Segunda');
      break;
    case '3':
      geraPorGeracao(252, 386, 'Terceira');
      break;
    case '4':
      geraPorGeracao(387, 493, 'Quarta');
      break;
    case '5':
      geraPorGeracao(494, 649, 'Quinta');
      break;
    case '6':
      geraPorGeracao(650, 721, 'Sexta');
      break;
    case '7':
      geraPorGeracao(722, 809, 'Sétima');
      break;
    case '8':
      geraPorGeracao(810, 898, 'Oitava');
      break;
    default:
      titleSection.innerText = 'Esta geração não existe';
      break;
  }
});
//Evento criado para adicionar 'selected' para cada div que representa um tipo 
for (let index = 0; index < cadaTipo.length; index += 1) {
  const cadaTipo = document.getElementsByClassName('form-check')[index];
  cadaTipo.addEventListener('click', () => {
    if (cadaTipo.className.includes('selected')) {
      cadaTipo.classList.remove('selected');
      cadaTipo.style.fontWeight = 'normal';
    }
    else {
      cadaTipo.classList.add('selected');
      cadaTipo.style.fontWeight = 'bolder';
    }
  });
}
//busca na api todos os pokémon que possuem o tipo selecionado
function procuraTipoPorPokemon(cadaTipo, nome) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then((response) => response.json())
    .then((responseJson) => {
      const objetoPokemon = geraObjetoPokemon(responseJson);
      if (objetoPokemon.type.includes(cadaTipo)) {
        quantidade += 1;
        titleSection.innerText = `Total de Pokémon dos tipos ${geraNomeComPrimeiraLetraMaiuscula(cadaTipo)}: ${quantidade}`;
        acrescentaPokemon(objetoPokemon);
      }
    })
    .catch()
}
//Botão de busca por tipo de pokémon
buttonSearchType.addEventListener('click', () => {
  const arraySelected = [];
  const todosOsTipos = document.getElementsByClassName('form-check');
  for (let j = 0; j < todosOsTipos.length; j += 1) {
    const buscaporTipo = document.getElementsByClassName('form-check')[j];
    if (buscaporTipo.className.includes('selected')) {
      arraySelected.push(buscaporTipo.id);
    }
  }
  if (arraySelected.length === 1) {
    removeElementos();
    quantidade = 0;
    titleSection.innerText = `Buscando todos os Pokémon do tipo ${geraNomeComPrimeiraLetraMaiuscula(arraySelected[0])} ...`;
    for (let n = 1; n < 898; n += 1) {
      procuraTipoPorPokemon(arraySelected[0], n);
    }
  }
  else if (arraySelected.length === 2) {
    removeElementos();
    quantidade = 0;
    titleSection.innerText = `Buscando todos os Pokémon dos tipos ${geraNomeComPrimeiraLetraMaiuscula(arraySelected[0])} e ${geraNomeComPrimeiraLetraMaiuscula(arraySelected[1])} ...`;
    for (let k = 1; k < 898; k += 1) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${k}`)
        .then((response) => response.json())
        .then((responseJson) => {
          const objetoPokemon = geraObjetoPokemon(responseJson);
          if (objetoPokemon.type.includes(arraySelected[0]) && objetoPokemon.type.includes(arraySelected[1])) {
            quantidade += 1;
            titleSection.innerText = `Total de Pokémon dos tipos ${geraNomeComPrimeiraLetraMaiuscula(arraySelected[0])} e ${geraNomeComPrimeiraLetraMaiuscula(arraySelected[1])}: ${quantidade}`;
            acrescentaPokemon(objetoPokemon);
          }
        })
      }
      
  }
  else {
    window.alert('Não existem pokémon com mais de 2 tipos');
  }
  for (let i = 0; i < cadaTipo.length; i += 1) {
    const cadaTipoLoop = document.getElementsByClassName('form-check')[i];
    cadaTipoLoop.classList.remove('selected');
  }
});
