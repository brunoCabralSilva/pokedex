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
//Título onde são postadas as informações na main
const titleSection = document.getElementById('title-section');
//Botão criado para executar a busca dos tipos selecionados
const buttonSearchType = document.getElementById('btn-search-by-Type');
//bloco lateral
const aside = document.getElementById('search-By-Type');
//div que possui a animação de carregamento
const carregando = document.getElementById('carregando');
const btnMore20 = document.getElementById('btn-more-20-Pokemon');
const btnTodosPokemon = document.getElementById('btn-todos-pokemon');
const labelTodosPokemon = document.getElementById('label-todos-pokemon');
//imagens a serem exibidas abaixo da barra de tipos (não são exibidos em mobile)
const imagensLaterais = ['../imagens/lateral/ash.jpg', '../imagens/lateral/milotic.jpg', '../imagens/lateral/dratini.jpg', '../imagens/lateral/umbreon.jpg', '../imagens/lateral/chandelure.jpg'];
let inicialDefault = 1;
let acumuladorDefault = 20;
let correria = 0;
//Quantifica o número de pokémon de acordo com cada necessidade
let quantidade = 0;
//Retorna o nome com a primeira palavra em maiúsculo e as demais em minúsculo
function organizaPalavra(nome) {
  let nomeAlterado = nome[0].toUpperCase();
  for (let i = 1; i < nome.length; i += 1) {
    nomeAlterado += nome[i].toLowerCase();
  }
  return nomeAlterado;
}
function criaScroolPage(tipo) {
  const newDiv = document.createElement('scroll-page');
  newDiv.setAttribute('class', 'form-check mb-3');
  newDiv.setAttribute('id', tipo.id);
  return newDiv;
}
function criaNovaImg(classeImg, widthImg, altImg, src) {
  const newImage = document.createElement('img');
  if (src.length > 1) {
    let i = 0;
    setInterval(() => {
      newImage.src = src[i];
      i += 1;
      if (i >= src.length) i = 0;
    }, 1500);
  } else {
    newImage.src = src[0];
  }
  newImage.setAttribute('class', classeImg);
  newImage.style.width = widthImg;
  newImage.alt = altImg;
  return newImage;
}
function criaNovaLabel(tipo) {
  const newLabel = document.createElement('label');
  newLabel.setAttribute('class', 'form-check-label mx-3');
  newLabel.innerText = tipo.tipo;
  newLabel.style.color = 'white';
  newLabel.style.textShadow = '0.1em 0.1em black';
  newLabel.style.fontSize = '18px';
  return newLabel;
}
function criaNovaLi(nomeDaClasse) {
  const novoPokemon = document.createElement('li');
  novoPokemon.setAttribute('class', nomeDaClasse);
  novoPokemon.textDecoration = 'none';
  return novoPokemon;
}
function criaNovoP(objeto) {
  const nomeMaiusculo = organizaPalavra(objeto.nome);
  const pNamePokemon = document.createElement('p');
  pNamePokemon.innerText = `${objeto.id} - ${nomeMaiusculo}`;
  return pNamePokemon;
}
function criaNovaDiv(id) {
  const divImgType = document.createElement('div');
  divImgType.setAttribute('id', id);
  return divImgType;
}

function dadosPokemon(pokemon) {
  titleSection.innerText = organizaPalavra(pokemon.nome);
  btnMore20.style.display = 'none';
  removeElementos();
  const divPokemonEscolhido = document.createElement('div');
  divPokemonEscolhido.setAttribute('id', 'info-pokemon-escolhido');
  const novaImg = criaNovaImg('img-pokemon-escolhido', '200px', `Imagem do ${pokemon.nome}`, pokemon.imagem);
  const tipo = document.createElement('p');
  tipo.innerText = 'Tipos:';
  const height = document.createElement('p');
  height.innerText = `Altura: ${pokemon.height / 10}m`;
  const weight = document.createElement('p');
  weight.innerText = `Peso: ${pokemon.weight}Kg`;
  const id = document.createElement('p');
  id.innerText = `#${pokemon.id}`;
  const movesUl1 = document.createElement('ul');
  const movesUl2 = document.createElement('ul');
  const movesUl3 = document.createElement('ul');
  const nameMoves = (pokemon.moves.map((move) => organizaPalavra(move.move.name))).sort();
  for (let i = 0; i < nameMoves.length; i += 1) {
    const movesLi = document.createElement('li');
    movesLi.innerText = nameMoves[i];
    if (i < nameMoves.length / 3) {
      movesUl1.appendChild(movesLi);
    } else if (i >= nameMoves.length / 3 && i < (nameMoves.length - nameMoves.length / 3)) {
      movesUl2.appendChild(movesLi);
    } else {
      movesUl3.appendChild(movesLi);
    }
  }

  const divMoves = document.createElement('div');
  divMoves.setAttribute('id', 'divMoves');
  const titleMoves = document.createElement('h1');
  titleMoves.setAttribute('id', 'titleMoves');
  titleMoves.innerText = 'Movimentos:';
  divMoves.appendChild(titleMoves);
  const divUl = document.createElement('div');
  divUl.setAttribute('id', 'divUl');
  divUl.appendChild(movesUl1);
  divUl.appendChild(movesUl2);
  divUl.appendChild(movesUl3);
  divMoves.appendChild(divUl);
  const divStats = document.createElement('div');
  divStats.setAttribute('id', 'divStats');
  const divTable = document.createElement('div');
  const divCadaStatus = document.createElement('div');
  divCadaStatus.setAttribute('class', 'divCadaStatus');
  pokemon.stats.forEach((stat) => {
    const divCadaStatAgrupado = document.createElement('div');
    divCadaStatAgrupado.setAttribute('id', 'divCadaStatAgrupado');
    const divInfoValor = document.createElement('div');
    divInfoValor.setAttribute('id', 'divInfoValor');
    const div = document.createElement('div');
    divInfoValor.innerText = `${stat.base_stat}`;
    const width = stat.base_stat * 2.1;
    div.style.minWidth = `${width}px`;
    div.setAttribute('class', 'divtabela');
    div.setAttribute('id', width);
    divCadaStatAgrupado.appendChild(div);
    divCadaStatAgrupado.appendChild(divInfoValor);
    divStats.appendChild(divCadaStatAgrupado);
  });

  const primeiro = divStats.firstElementChild.firstElementChild;
  primeiro.innerText = `${organizaPalavra(pokemon.stats[0].stat.name)} `;
  const segundo = divStats.firstElementChild.nextElementSibling.firstElementChild;
  segundo.innerText = `${organizaPalavra(pokemon.stats[1].stat.name)}`;
  const terceiro = divStats.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
  terceiro.innerText = `${organizaPalavra(pokemon.stats[2].stat.name)}`;
  const quarto = divStats.lastElementChild.previousElementSibling.previousElementSibling.firstElementChild;
  quarto.innerText = `${organizaPalavra('Special-Atk')}`;
  const quinto = divStats.lastElementChild.previousElementSibling.firstElementChild;
  quinto.innerText = `${organizaPalavra('Special-Def')}`;
  const sexto = divStats.lastElementChild.firstElementChild;
  sexto.innerText = `${organizaPalavra(pokemon.stats[5].stat.name)}`;

  const divDadosIniciais = document.createElement('div');
  divDadosIniciais.setAttribute('id', 'divDadosIniciais');
  const primeiraSecao = document.createElement('section');
  primeiraSecao.setAttribute('id', 'primeiraSecao');
  const divParaDivTipos = document.createElement('div');
  divParaDivTipos.setAttribute('id', 'divParaDivTipos');
  divDadosIniciais.appendChild(id);
  divDadosIniciais.appendChild(height);
  divDadosIniciais.appendChild(weight);
  divParaDivTipos.appendChild(tipo);
  pokemon.type.forEach((tipo) => {
    const link = [`../imagens/type-logo/${tipo}.png`];
    const imgType = criaNovaImg('pokemon-image-type-mostra', '30px', `Imagem do ${tipo.image}`, link);
    const divTipos = document.createElement('div');
    divTipos.setAttribute('class', 'divTipos');
    const pTipo = document.createElement('p');
    pTipo.innerText = `${organizaPalavra(tipo)}`;
    divTipos.appendChild(imgType);
    divTipos.appendChild(pTipo);
    divParaDivTipos.appendChild(divTipos);
  });
  const divDuasDivs = document.createElement('div');
  divDuasDivs.setAttribute('id', 'divDuasDivs');
  const divImg = document.createElement('div');
  divImg.setAttribute('id', 'divImg');
  divImg.appendChild(novaImg);
  primeiraSecao.appendChild(divImg);
  primeiraSecao.appendChild(divDadosIniciais);
  divDadosIniciais.appendChild(divParaDivTipos);
  divDuasDivs.appendChild(primeiraSecao);
  divDuasDivs.appendChild(divStats);
  divPokemonEscolhido.appendChild(divDuasDivs);
  divPokemonEscolhido.appendChild(divMoves);
  areaPrincipal.appendChild(divPokemonEscolhido);
}
//cria elementos que serão exibidos no html
function acrescentaPokemon(objeto) {
  //Cria elementos para cada pokémon
  const novoPokemon = criaNovaLi('li-pokemon');
  const pNamePokemon = criaNovoP(objeto);
  const imagePokemon = criaNovaImg('image-li-pokemon', '150px', `Imagem do ${objeto.nome}`, objeto.imagem);
  const divImgType = criaNovaDiv('divImgType');
  //cria imagem de cada tipo que o pokémon possui
  objeto.type.forEach((tipo) => {
    const link = [`../imagens/type-logo/${tipo}.png`];
    const imgType = criaNovaImg('pokemon-image-type', '55px', `Imagem do ${tipo.image}`, link);
    divImgType.appendChild(imgType);
  });
  novoPokemon.addEventListener('mouseover', () => {
    if (objeto.imagem.length > 1) {
      let i = 0;
      correria = setInterval(() => {
        imagePokemon.src = objeto.imagem[i];
        i += 1;
        if (i >= objeto.imagem.length) i = 0;
      }, 300);
    }
    novoPokemon.style.backgroundImage = 'none';
    novoPokemon.style.backgroundColor = '#363775';
    novoPokemon.style.border = '4px solid rgb(193, 2, 252)';
  });
  novoPokemon.addEventListener('mouseout', () => {
    imagePokemon.src = objeto.imagem[0];
    clearInterval(correria);
    novoPokemon.style.border = '1px solid rgb(116, 112, 112)';
    novoPokemon.style.backgroundImage = "url('../imagens/wallpaper/wallpaper.jpg')";
  });
  novoPokemon.addEventListener('click', async () => dadosPokemon(objeto));
  //acrescenta para elemento o pai li
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
//cria objeto para cada Pokémon
function geraObjetoPokemon(responseJson) {
  const dadosPokemon = {
    nome: responseJson.name,
    imagem: [responseJson.sprites.front_default, responseJson.sprites.back_default, responseJson.sprites.front_shiny, responseJson.sprites.back_shiny],
    id: responseJson.id,
    type: geraArraydeTipos(responseJson),
    abilities: responseJson.abilities,
    height: responseJson.height,
    weight: responseJson.weight,
    moves: responseJson.moves,
    stats: responseJson.stats,
  };
  return dadosPokemon;
}
//Faz a busca na API
async function realizaBuscaNaAPI(argumentoBusca, cadaTipo) {
  if (typeof (argumentoBusca) === 'string') argumentoBusca = argumentoBusca.toLowerCase();
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${argumentoBusca}`);
  const pokemonJson = await pokemon.json();
  const dadosPokemon = geraObjetoPokemon(pokemonJson);
  if (cadaTipo === 0) {
    return dadosPokemon;
  } else {
    if (dadosPokemon.type.includes(cadaTipo)) {
      quantidade += 1;
      titleSection.innerText = `Buscando todos os Pokémon do tipo ${cadaTipo.toUpperCase()}: ${quantidade}`;
      acrescentaPokemon(dadosPokemon);
    }
  }
}
//gera da api todos os nomes dos pokémon existentes e exibe todos os pokémon por padrão
async function geraNomesDaLista() {
  btnMore20.style.display = 'none';
  carregando.style.display = 'flex';
  for (let i = 1; i <= 898; i += 1) {
    const objetoPokemon = await realizaBuscaNaAPI(i, 0);
    const pokemon = document.createElement('option');
    pokemon.value = objetoPokemon.nome;
    pokemon.innerText = `${objetoPokemon.id} - ${organizaPalavra(objetoPokemon.nome)}`;
    selectByName.appendChild(pokemon);
  }
}

async function defaultNomesEPokemon(inicialDefault, acumuladorDefault) {
  let i = 0;
  carregando.style.display = 'flex';
  for (let i = inicialDefault; i <= acumuladorDefault; i += 1) {
    titleSection.innerText = `Bem Vindo! Listando Pokémon abaixo: ${i}`;
    const objetoPokemon = await realizaBuscaNaAPI(i, 0);
    acrescentaPokemon(objetoPokemon);
  }
  titleSection.innerText = `Bem Vindo! ${acumuladorDefault} Pokémon foram listados!`;
  carregando.style.display = 'none';
  btnMore20.style.display = 'flex';
}

btnMore20.addEventListener('click', () => {
  if (acumuladorDefault === 880) {
    defaultNomesEPokemon(881, 898);
  }
  else {
    inicialDefault = acumuladorDefault + 1;
    acumuladorDefault += 20;
    defaultNomesEPokemon(inicialDefault, acumuladorDefault);
  }
});
btnTodosPokemon.addEventListener('mouseover', () => btnTodosPokemon.style.backgroundColor = '#53549e');
btnTodosPokemon.addEventListener('mouseout', () => btnTodosPokemon.style.backgroundColor = 'transparent');

labelTodosPokemon.addEventListener('click', () => {
  removeElementos();
  defaultNomesEPokemon(1, 20);
});

//Cria cada tipo de pokémon na barra lateral
function criaTiposBarraLateral() {
  type.forEach((tipo) => {
    const link = [tipo.image];
    const div = criaScroolPage(tipo);
    const imageDiv = criaNovaImg('type-pokemon-image py-1', '40px', tipo.tipo, link);
    const newLabel = criaNovaLabel(tipo);
    //acrescenta para a div pai os filhos label e image criados
    div.appendChild(imageDiv);
    div.appendChild(newLabel);
    buscaPorTipo.appendChild(div);
    //cria evento de mudar a cor do background caso passe o mouse por cima
    div.addEventListener('mouseover', () => div.style.backgroundColor = '#53549e');
    div.addEventListener('mouseout', () => div.style.backgroundColor = 'transparent');
  });
}
//Cria imagens que aparecem abaixo dos tipos a serem selecionados (não aparece para mobile)
function criaImagensLaterais() {
  imagensLaterais.forEach((link) => {
    const divLateral = document.createElement('div');
    divLateral.setAttribute('class', 'divLateral');
    const imagemLateral = document.createElement('img');
    imagemLateral.src = link;
    imagemLateral.setAttribute('class', 'imgLateral');
    divLateral.appendChild(imagemLateral);
    aside.appendChild(divLateral);
  });
}
//remove elemento <ul> completo e cria um novo
function removeElementos() {
  areaPrincipal.parentNode.removeChild(areaPrincipal);
  areaPrincipal = document.createElement('ul');
  areaPrincipal.setAttribute('id', 'info-Pokemon');
  article.appendChild(areaPrincipal);
}
//Cria loop de exibição de pokémon em que o # se encontra dentro do intervalo de números da geração
async function geraPorGeracao(n1, n2, gen) {
  for (let i = n1; i <= n2; i += 1) {
    carregando.style.display = 'flex';
    quantidade += 1;
    titleSection.innerText = `Carregando todos os Pokémon da ${gen} Geração: ${quantidade}/${n2 - n1 + 1}`;
    acrescentaPokemon(await realizaBuscaNaAPI(i, 0));
    titleSection.innerText = `Todos os ${n2 - n1 + 1} Pokémon da ${gen} Geração foram carregados abaixo!`;
  }
  carregando.style.display = 'none';
  btnMore20.style.display = 'flex';
}
//Evento criado para pegar o que for digitado no input
function procuraPorNomeDigitado() {
  buttonInput.addEventListener('click', async () => {
    carregando.style.display = 'flex';
    titleSection.innerText = organizaPalavra(inputInsereNome.value);
    removeElementos();
    btnMore20.style.display = 'none';
    dadosPokemon(await realizaBuscaNaAPI(inputInsereNome.value, 0));
    inputInsereNome.value = '';
    carregando.style.display = 'none';
  });
}
//Evento criado para pegar o que for selecionado na lista de nomes
function procuraPorNomeEscolhido() {
  btnMore20.style.display = 'none';
  buttonNameSelect.addEventListener('click', async () => {
    carregando.style.display = 'flex';
    removeElementos();
    const nomeSelected = selectByName.options[selectByName.selectedIndex].value;
    titleSection.innerText = organizaPalavra(nomeSelected);
    dadosPokemon(await realizaBuscaNaAPI(nomeSelected, 0));
    carregando.style.display = 'none';
  });
}
//Evento criado para pegar a geração escolhida
function pegaGeraçãoEscolhida() {
  butonGeneration.addEventListener('click', () => {
    removeElementos();
    quantidade = 0;
    const valorSelect = selectByGeneration.options[selectByGeneration.selectedIndex].value;
    switch (valorSelect) {
      case '1':
        geraPorGeracao(1, 151, '1ª');
        break;
      case '2':
        geraPorGeracao(152, 251, '2ª');
        break;
      case '3':
        geraPorGeracao(252, 386, '3ª');
        break;
      case '4':
        geraPorGeracao(387, 493, '4ª');
        break;
      case '5':
        geraPorGeracao(494, 649, '5ª');
        break;
      case '6':
        geraPorGeracao(650, 721, '6ª');
        break;
      case '7':
        geraPorGeracao(722, 809, '7ª');
        break;
      case '8':
        geraPorGeracao(810, 898, '8ª');
        break;
      default:
        titleSection.innerText = 'Esta geração não existe';
        break;
    }
  });
}
//Evento criado para adicionar 'selected' para cada div que representa um tipo
function tipoSelected() {
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
}
//Procura os Pokémon pelos dois tipos guardados no array e cria um elemento para cada Pokémon que tenha os dois tipos
async function doisTiposSelecionados(arraySelected) {
  carregando.style.display = 'flex';
  quantidade = 0;
  for (let k = 1; k < 898; k += 1) {
    titleSection.innerText = `Buscando todos os Pokémon dos tipos ${organizaPalavra(arraySelected[0])} e ${organizaPalavra(arraySelected[1])}: ${quantidade}`;
    const objetoPokemon = await realizaBuscaNaAPI(k, 0);
    if (objetoPokemon.type.includes(arraySelected[0]) && objetoPokemon.type.includes(arraySelected[1])) {
      quantidade += 1;
      acrescentaPokemon(objetoPokemon);
    }
  }
  titleSection.innerText = `Total de Pokémon encontrados dos tipos ${organizaPalavra(arraySelected[0])} e ${organizaPalavra(arraySelected[1])}: ${quantidade}`;
  carregando.style.display = 'none';
}
//Adiciona a um array o nome de cada tipo que foi selecionado para a busca
function arraysDeTiposSelecionados() {
  const arraySelected = [];
  const todosOsTipos = document.getElementsByClassName('form-check');
  for (let j = 0; j < todosOsTipos.length; j += 1) {
    const buscaporTipo = document.getElementsByClassName('form-check')[j];
    if (buscaporTipo.className.includes('selected')) {
      arraySelected.push(buscaporTipo.id);
    }
  }
  return arraySelected;
}
//Faz uma tratativa para cada quantidade de tipos que foram escolhidos
async function processaTiposEscolhidos(arraySelected) {
  switch (arraySelected.length) {
    case 0:
      window.alert('Você não selecionou um tipo para a busca. Escolha pelo menos um!');
      break;
    case 1:
      carregando.style.display = 'flex';
      removeElementos();
      for (let n = 1; n < 898; n += 1) await realizaBuscaNaAPI(n, arraySelected[0]);
      titleSection.innerText = `Total de Pokémon encontrados do tipo ${organizaPalavra(arraySelected[0])}: ${quantidade}`;
      carregando.style.display = 'none';
      break;
    case 2:
      btnMore20.style.display = 'none';
      removeElementos();
      doisTiposSelecionados(arraySelected);
      break;
    default:
      window.alert('Não existem pokémon com mais de 2 tipos: Escolha no máximo 2 tipos para a busca');
  }
}
//Percorre todos os tipos e tira a classe selected de cada um deles
function removeTodasAsClasses() {
  for (let i = 0; i < cadaTipo.length; i += 1) {
    const cadaTipoLoop = document.getElementsByClassName('form-check')[i];
    cadaTipoLoop.classList.remove('selected');
  }
}
//Botão de busca por tipo de pokémon
function buscaPorTipodePokemon() {
  buttonSearchType.addEventListener('click', () => {
    const arraySelected = arraysDeTiposSelecionados();
    processaTiposEscolhidos(arraySelected);
    removeTodasAsClasses();
  });
}
//Inicializa chamando as funções citadas
window.onload = () => {
  criaTiposBarraLateral();
  geraNomesDaLista();
  defaultNomesEPokemon(inicialDefault, acumuladorDefault);
  procuraPorNomeDigitado();
  procuraPorNomeEscolhido();
  criaImagensLaterais();
  tipoSelected();
  pegaGeraçãoEscolhida();
  buscaPorTipodePokemon();
};