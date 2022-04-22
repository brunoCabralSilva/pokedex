// const tiposPokemon  = require('../data/data');

const cadaTipo = document.getElementsByClassName('form-check');
const buscaPorTipo = document.getElementById('search-By-Type');
const inputTextSearchOne = document.getElementById('input-search-one-pokemon');
const buttonSearchOne = document.getElementById('btn-search-one-pokemon');
let areaPrincipal = document.getElementById('info-Pokemon');
const cadaPokemonEscolhido = document.getElementsByClassName('li-pokemon');
const article = document.getElementById('info');
const butonGeneration = document.getElementById('btn-search-by-generation');
const buttonNameSelect = document.getElementById('btn-search-by-name');
const nameSelected = document.getElementById('name-selected');
const select = document.getElementById('generation-selected');

const type = [
  {
    tipo: 'Normal',
    image: '../imagens/type-logo/normal.png',
    id: 'normal',
  },
  {
    tipo: 'Fogo',
    image: '../imagens/type-logo/fire.png',
    id: 'fire',
  },
  {
    tipo: 'Água',
    image: '../imagens/type-logo/water.png',
    id: 'water',
  },
  {
    tipo: 'Grama',
    image: '../imagens/type-logo/grass.png',
    id: 'grass',
  },
  {
    tipo: 'Voador',
    image: '../imagens/type-logo/flying.png',
    id: 'flying',
  },
  {
    tipo: 'Lutador',
    image: '../imagens/type-logo/fighting.png',
    id: 'fighting',
  },
  {
    tipo: 'Elétrico',
    image: '../imagens/type-logo/electric.png',
    id: 'electric',
  },
  {
    tipo: 'Venenoso',
    image: '../imagens/type-logo/poison.png',
    id: 'poison',
  },
  {
    tipo: 'Terrestre',
    image: '../imagens/type-logo/ground.png',
    id: 'ground',
  },
  {
    tipo: 'Pedra',
    image: '../imagens/type-logo/rock.png',
    id: 'rock',
  },
  {
    tipo: 'Psíquico',
    image: '../imagens/type-logo/psychic.png',
    id: 'psychic',
  },
  {
    tipo: 'Gelo',
    image: '../imagens/type-logo/ice.png',
    id: 'ice',
  },
  {
    tipo: 'Inseto',
    image: '../imagens/type-logo/bug.png',
    id: 'bug',
  },
  {
    tipo: 'Fantasma',
    image: '../imagens/type-logo/ghost.png',
    id: 'ghost'
  },
  {
    tipo: 'Aço',
    image: '../imagens/type-logo/steel.png',
    id: 'steel',
  },
  {
    tipo: 'Dragão',
    image: '../imagens/type-logo/dragon.png',
    id: 'dragon',
  },
  {
    tipo: 'Sombrio',
    image: '../imagens/type-logo/dark.png',
    id: 'dark',
  },
  {
    tipo: 'Fada',
    image: '../imagens/type-logo/fairy.png',
    id: 'fairy',
  }];

for (i = 1; i <= 898; i += 1) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((resposta) => resposta.json())
    .then((respostaJson) => {
      const pokemon = document.createElement('option');
      pokemon.value = respostaJson.name;
      pokemon.innerText = `#${respostaJson.id} - ${respostaJson.name}`;
      nameSelected.appendChild(pokemon);
    })
    .catch()
}

function procuraTipoPorPokemon(respostaJson, cadaTipo) {
  console.log(cadaTipo);
  const arrayTipos = geraArraydeTipos(respostaJson, calculaQuantTipos(respostaJson));

  if (cadaTipo === undefined || arrayTipos.includes(cadaTipo)) {
    geraDadosPokemon(criaObjetoPokemon(respostaJson));
  }
}

function geraPokemonsPorNumeroDeGeracao(n1, n2) {
  for (i = n1; i <= n2; i += 1) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((resposta) => resposta.json())
      .then((respostaJson) => {
        procuraTipoPorPokemon(respostaJson, undefined);
      })
      .catch()
  }
}

function chamaPokemonDoTipo(cadaTipo) {
  for (i = 1; i <= 898; i += 1) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((resposta) => resposta.json())
      .then((respostaJson) => {
        procuraTipoPorPokemon(respostaJson, cadaTipo);
      })
      .catch()
  }
}

type.forEach((tipo) => {
  newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'form-check mb-3');
  newDiv.setAttribute('id', tipo.id);
  newImage = document.createElement('img');
  newImage.src = tipo.image;
  newImage.alt = `Imagem do tipo ${tipo.tipo}`;
  newImage.setAttribute('class', 'type-pokemon-image py-1');
  newImage.style.width = '40px';
  newLabel = document.createElement('label');
  newLabel.setAttribute('class', 'form-check-label mx-3');
  newLabel.innerText = tipo.tipo;

  newDiv.appendChild(newImage);
  newDiv.appendChild(newLabel);

  buscaPorTipo.appendChild(newDiv);
});

for (i = 0; i < cadaTipo.length; i += 1) {
  const cadaTipo = document.getElementsByClassName('form-check')[i];
  cadaTipo.addEventListener('click', () => {
    if (cadaTipo.className.includes('selected')) {
      cadaTipo.classList.remove('selected');
      cadaTipo.style.fontWeight = 'normal';
      removeElementos();
    }
    else {
      cadaTipo.classList.add('selected');
      removeElementos();
      cadaTipo.style.fontWeight = 'bolder';
      chamaPokemonDoTipo(cadaTipo.id);
    }
  });
}
// function mudaImagemAoClicar(imagePokemon, objeto) {
//   let j = 0;
//   for (i = 0; i < cadaPokemonEscolhido.length; i += 1) {
//     const cadaPokemonEscolhido = document.getElementsByClassName('li-pokemon')[i];
//     cadaPokemonEscolhido.addEventListener('click', () => {
//       if (j < objeto.imagem.length - 1) {
//         imagePokemon.src = objeto.imagem[i + j];
//         j += 1;
//       } else {
//         imagePokemon.src = objeto.imagem[0];
//         j = 0;
//       }
//     });
//   }
// }

function geraDadosPokemon(objeto) {

  const tiposOrdenados = objeto.type.sort();

  const novoPokemon = document.createElement('li');
  novoPokemon.setAttribute('class', 'li-pokemon');
  novoPokemon.textDecoration = 'none';

  const nomeMaiusculo = objeto.nome.toUpperCase();
  const pNamePokemon = document.createElement('p');
  pNamePokemon.innerText = `${objeto.id} - ${nomeMaiusculo}`;

  const imagePokemon = document.createElement('img');
  imagePokemon.src = objeto.imagem[0];
  imagePokemon.setAttribute('class', 'image-li-pokemon');
  imagePokemon.style.width = '130px';
  imagePokemon.alt = `Imagem do ${objeto.nome}`;

  const divImgType = document.createElement('div');
  divImgType.setAttribute('id', 'divImgType');

  const imgType1 = document.createElement('img');
  imgType1.setAttribute('class', 'pokemon-image-type');
  imgType1.src = `../imagens/type-logo/${tiposOrdenados[0]}.png`;

  if (tiposOrdenados.length > 1) {
    const imgType2 = document.createElement('img');
    imgType2.src = `../imagens/type-logo/${tiposOrdenados[1]}.png`;
    imgType2.setAttribute('class', 'pokemon-image-type');

    divImgType.appendChild(imgType1);
    divImgType.appendChild(imgType2);
  }

  else {
    const imgType1 = document.createElement('img');
    imgType1.setAttribute('class', 'pokemon-image-type');
    imgType1.src = `../imagens/type-logo/${tiposOrdenados[0]}.png`;
    divImgType.appendChild(imgType1);
  }

  novoPokemon.appendChild(pNamePokemon);
  novoPokemon.appendChild(imagePokemon);
  novoPokemon.appendChild(divImgType);

  areaPrincipal.appendChild(novoPokemon);
}

function geraArraydeTipos(responseJson, tamanho) {
  const arrayTipos = [];
  arrayTipos.push(responseJson.types[0].type.name);
  if (tamanho > 1) {
    arrayTipos.push(responseJson.types[1].type.name);
  }
  return arrayTipos;
}

function calculaQuantTipos(responseJson) {
  if (Object.keys(responseJson.types).length > 1) {
    return 2;
  }
  else {
    return 1;
  }
}

function criaObjetoPokemon(responseJson) {
  const dadosPokemon = {
    nome: responseJson.name,
    imagem: [responseJson.sprites.front_default, responseJson.sprites.back_default, responseJson.sprites.front_shiny, responseJson.sprites.back_shiny],
    id: responseJson.id,
    type: geraArraydeTipos(responseJson, calculaQuantTipos(responseJson)),
  };
  return dadosPokemon;
}

function buscaObjetoPokemon(nome) {
  const nomeDigitado = nome.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${nomeDigitado}`)
    .then((response) => response.json())
    .then((responseJson) => {
      geraDadosPokemon(criaObjetoPokemon(responseJson));
    })
    .catch()
}

function removeElementos() {
  areaPrincipal.parentNode.removeChild(areaPrincipal);
  areaPrincipal = document.createElement('ul');
  areaPrincipal.setAttribute('id', 'info-Pokemon');
  article.appendChild(areaPrincipal);
}

buttonSearchOne.addEventListener('click', () => {
  removeElementos();
  buscaObjetoPokemon(inputTextSearchOne.value);
  inputTextSearchOne.value = '';
});

butonGeneration.addEventListener('click', () => {
  removeElementos();
  const valorSelect = select.options[select.selectedIndex].value;
  switch (valorSelect) {
    case '1':
      geraPokemonsPorNumeroDeGeracao(1, 151);
      break;
    case '2':
      geraPokemonsPorNumeroDeGeracao(152, 251);
      break;
    case '3':
      geraPokemonsPorNumeroDeGeracao(252, 386);
      break;
    case '4':
      geraPokemonsPorNumeroDeGeracao(387, 493);
      break;
    case '5':
      geraPokemonsPorNumeroDeGeracao(494, 649);
      break;
    case '6':
      geraPokemonsPorNumeroDeGeracao(650, 721);;
      break;
    case '7':
      geraPokemonsPorNumeroDeGeracao(722, 809);
      break;
    case '8':
      geraPokemonsPorNumeroDeGeracao(810, 898);
      break;
    default:
      console.log('Esta geração não existe');
      break;
  }

});
buttonNameSelect.addEventListener('click', () => {
  removeElementos();
  const nomeSelect = nameSelected.options[nameSelected.selectedIndex].value;
  console.log(nomeSelect);
  buscaObjetoPokemon(nomeSelect);
});