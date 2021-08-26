const seletores = {
 nomeBusca:document.querySelector('.input'),
 mensagemErro: document.querySelector('#mensagemErro'),
 botaoBuscar: document.querySelector('#botao_buscar'),
 titulo: document.querySelector('#titulo'),
 ano: document.querySelector('#ano'),
 genero: document.querySelector('#genero'),
 diretor: document.querySelector('#diretor'),
 atores: document.querySelector('#atores'),
 poster: document.querySelector('.poster'),
 sinopse: document.querySelector('#sinopse'),
 apiKey : "46b68b72",
 imgDefault : "./default_image.png",
}

const {nomeBusca,mensagemErro,botaoBuscar,titulo,ano,genero,diretor,atores,poster,sinopse, apiKey, imgDefault} = seletores;

async function buscaFilme(nomeBusca){
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}

botaoBuscar.addEventListener('click', () => {
     limparCampos();
     core();
});

async function core() {
     try{
          const filme = await buscaFilme(nomeBusca.value);
          validaDados(filme);
          defineValores(filme);
     }catch(erro){
          console.log(erro);
          mensagemErro.textContent =`${erro}`;
     }
     
}

function defineValores(filme){
     titulo.textContent = filme.Title;
     sinopse.textContent = filme.Plot;
     ano.textContent = `Year:${filme.Year}`;
     genero.textContent = `Genre: ${filme.Genre}`;
     diretor.textContent = `Director: ${filme.Director}`;
     atores.textContent = `Actors:${filme.Actors}`;
     poster.setAttribute('src', filme.Poster);
}

function limparCampos(){
     titulo.textContent = "";
     sinopse.textContent = "";
     ano.textContent = "";
     genero.textContent = "";
     diretor.textContent = "";
     atores.textContent = "";
     poster.setAttribute('src', imgDefault);
}

function validaDados(filme){
     if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === 'N/A'){
          throw new Error('Filme não encontrado!!!')
     }
}