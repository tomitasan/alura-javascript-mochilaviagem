const form  = document.getElementById("novoItem");

// adiciona o item criado via javascript ao elemento de id 'lista' do HTML
const lista = document.getElementById("lista");

// cria o array de items para salvar cada item criado no localStorage
// consulta o localStorage para ver se já existem itens salvos
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// console.log(itens);

itens.forEach( (elemento) => {
    // console.log(elemento.nome, elemento.quantidade);
    criaElemento(elemento);
});

// 'evento' é o que acontece quando acionamos o botão 'submit'
form.addEventListener("submit", (evento) => {

    // interrompe o comportamento da ação 'submit' - enviar os dados 
    evento.preventDefault();

    // traz todos os detalhes do evento 'SUBMIT' do formulário
    // console.log(evento);

    // exibe o dado inserido no campo do formulário - 'nome'
    // console.log(evento.target.elements['nome'].value);

    // exibe o dado inserido no campo do formulário - 'quantidade'
    // console.log(evento.target.elements['quantidade'].value);

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // variável para informar se item cadastrado já existe na lista
    const existe = itens.find( elemento => elemento.nome === nome.value);
    
    // transforma o item criado em um objeto
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        // adiciona o item criado no array items
        itens.push(itemAtual);
    }

    // armazenar os dados criados no formulário no localStorage
    // JSON.stringfy transforma o objeto itemAtual em string
    localStorage.setItem("itens", JSON.stringify(itens));

    // depois de cadastrar um elemento, limpa o formulário
    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item) {
    // console.log(nome);
    // console.log(quantidade);

    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id;
    // console.log(numeroItem);

    // o innerHTML acaba criando um Object com varios detalhes
    // novoItem.innerHTML = numeroItem + nome;

    // manipulação do item HTML criado usando appendChild
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    // cria o botao 'x' 
    novoItem.appendChild(botaoDeleta(item.id));

    // console.log(novoItem);
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    // console.log(document.querySelector("[data-id='"+item.id+"']"));
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
    // location.reload();
}

function botaoDeleta(id) {
    // cria dinamicamente o botão 'x' para cada item da lista
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "x";

    // adiciona o evento 'click' e manda o parentNode do elemento cujo botao foi clicado
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    // remover um item do array utilizando o id passado
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    // atualiza o localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

    // location.reload();
}