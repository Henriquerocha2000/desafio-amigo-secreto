//adiconar os amigos digitados
let listaAmigos= [];
//armazena os amigos sorteados para não sortear o mesmo aluno
let listaAmigoSorteados = [];
//caso digite uma novo nome qundo o bo~tao sortear estiver como 'Limpar lista de amigos sorteados'
let gambiarra = false;
function adicionarAmigo() {
    let inputAmigo = document.querySelector('input');
    if (inputAmigo.value == '') {//evita adicionar uma string vazia na lista de amigos
        alert('Por favor, digite um nome');
        return;
    }
    if (listaAmigos.includes(inputAmigo.value)) {//evita que seja adiconado um mesmo amigo
        alert('Este amigo já está presente na lista');
        inputAmigo.value = '';
        return;
    }
    listaAmigos.push(inputAmigo.value);//atualiza a lista de amigos caso passe por todos os ifs
    console.log(listaAmigos);//para teste
    inputAmigo.value = '';//limpa o campo do imput
    exibirNomes('listaAmigos',listaAmigos,'LISTA DE AMIGOS');
    // Cria o botão "Limpar Lista de Amigos" se for o primeiro nome adicionado
    if (listaAmigos.length == 1) {
        criarBotaoReiniciar();
    }
    if (gambiarra) {
        let correcao = document.getElementById('botaoSortear');
        exibirIcone(correcao.id);   
        correcao.textContent = 'Sortear amigo';
        correcao.onclick = sortearAmigo;
        gambiarra = false;
    }
}
  
function sortearAmigo(){
    let ulElemento = document.getElementById('resultado');//vai exibir o amigo sorteado
    ulElemento.textContent = '';
    if(listaAmigos.length == 0){//caso o usuário sortei sem ter adicionado um nome
        alert('Sua lista de amigos está vazia!!');
        return;
    }
    if(listaAmigos.length == 1){//caso o usuário sortei com apenas um nome
        alert('Acesse => https://cvv.org.br ');
        return;
    }
    if (listaAmigoSorteados.length == listaAmigos.length) {//acabo os amigos
        alert('Todos os amigos foram sorteados! Faça mais amizades!!!');
        //Alterando o texto do botão Sortear amigos
        let botaoSortear = document.getElementById('botaoSortear');
        exibirIcone(botaoSortear.id);
        botaoSortear.textContent = 'Limpar Lista de Amigos Sorteados';
        
        // Adiciona a função para limpar as listas ao botão
        botaoSortear.onclick = limparListaSorteados;
        gambiarra = true;
        return;
    }
    let numeroIndice;
    do {//preferencia pelo DoWhile, pois quero garantir que seja gerado um indice aleatório
        numeroIndice = parseInt(Math.random() * listaAmigos.length);
    } while (listaAmigoSorteados.includes(listaAmigos[numeroIndice]))
    
    listaAmigoSorteados.push(listaAmigos[numeroIndice]);//atualiza a lsita de amigos  sorteados 
    console.log(listaAmigoSorteados);//teste
    //exibindo o amigo sorteado
    ulElemento.textContent = listaAmigos[numeroIndice];

}
function exibirNomes(idUl, lista,texto) {
    // Seleciona o elemento <ul> pelo ID, para usar tanto na Lista Amigos como RESULTADO
    let ulElemento = document.getElementById(idUl);
    ulElemento.innerHTML = '';// Limpa o conteúdo atual da <ul> como solicita o desafio
    let li = document.createElement('li');
    li.textContent = texto;
    ulElemento.appendChild(li);
    // Perco o array lista e cria os elementos li
    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement('li'); // Cria um novo elemento <li>
        li.textContent = lista[i]; // Define o texto do <li> como o valor do item
        ulElemento.appendChild(li); // Adiciona o <li> à <ul>
    }
}


function criarBotaoReiniciar() {
    let lugarBotao = document.getElementById('botoes');
    let botaoLimpaListaAmigos = document.createElement('button');
    botaoLimpaListaAmigos.className = 'button-draw';
    botaoLimpaListaAmigos.id = 'botaoReiniciar';
    botaoLimpaListaAmigos.onclick = function () {
        location.reload();//uns dirão que foi preguiça eu digo fruto do meu 'aprofundamento' no conteudo
    }
    lugarBotao.appendChild(botaoLimpaListaAmigos);
    exibirIcone('botaoReiniciar');
    botaoLimpaListaAmigos.textContent = 'Limpar lista de amigos';
}

function limparListaSorteados() {
    listaAmigoSorteados = []; // Limpa a lista de sorteados
    exibirNomes('resultado', listaAmigoSorteados, 'LISTA DE AMIGOS SORTEADOS'); // Atualiza a exibição
    
    // Restaura o botão para "Realizar Sorteio"
    let botaoSortear = document.getElementById('botaoSortear');
    botaoSortear.textContent = 'Realizar Sorteio';
    botaoSortear.onclick = sortearAmigo;
}
function exibirIcone(idBotao) {
    let elemento = document.getElementById(idBotao);
    let icone = document.createElement('img');
    icone.src = 'assets/play_circle_outline.png';
    elemento.appendChild(icone);

}
