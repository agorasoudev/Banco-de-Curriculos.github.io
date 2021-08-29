'use strict';

//API CEP

const limparFormulario = (endereco) => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}


const eNumber = (Number) => /^[0-9]+$/.test(Number);
const cepValido = (cep) => cep.length == 8 && eNumber(cep);

const pesquisarCep = async() => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){ //verifica se retorna erro
            document.getElementById('rua').value = alert('Cep não encontrado');
            limparFormulario(); //limpa o formulário ao sair do campo
        }else {
            preencherFormulario(endereco);
        } 
    }else{
        document.getElementById('rua').value = alert('Cep incorreto');
        limparFormulario(); //limpa o formulário ao sair do campo
    }

}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

//Select ANO


function yearList() {
    let year = document.getElementById('ano') //busca o elemento HTML com o id "ano"
    for(let i = 1960; i<=new Date().getFullYear(); i++){ //loop contendo o ano inicial e final (selecionando o ano atual) que deverão constar no input select
        let option = document.createElement("option") //cria um elemento "option" na variável option
        option.value = i //atribui o valor do índice ao value do option
        option.text = i //atribui o valor do índice ao text do option
        year.appendChild(option) //cria um option como "filho" para o select, contendo o value e o text equivalentesao index atual
    }
}
yearList()






//Validador de CPF

console.log ('JavaScript carregado') // apenas para mostrar que o arquivo javascript está carregado


const limparCpf = (cpf_digitado) => {
    document.getElementById('cpf_digitado').value = '';

}

function validaCPF(cpf){
    if(cpf.length != 11 || 
    cpf == "00000000000" ||         
    cpf == "11111111111" ||         
    cpf == "22222222222" ||         
    cpf == "33333333333" ||         
    cpf == "44444444444" ||         
    cpf == "55555555555" ||         
    cpf == "66666666666" ||         
    cpf == "77777777777" ||         
    cpf == "88888888888" ||         
    cpf == "99999999999") { // verificando e validando se o cpf foi digitado com 11 numeros ou seuqnecia de numeros conhecidos
        return false
    }
    else{

        let numeros = cpf.substring(0,9); // funçao substring a partir de um ponto inicial e final ela quebra o texto e retorna somente aquilo que foi pedido (no caso vao me retornar o 9 primeiros numeros do cpf)
        let digitos = cpf.substring(9); // vai me retornar os digitos do cpf
        
        let soma = 0;
        for (let i = 10; i > 1; i--) { // laço de repetição: vai percorrer esse texto de trás pra frente. Vamos tratar os caracteres dessa string como posições numa lista para fins de manipulação
            soma+= numeros.charAt(10 - i) * i; // função charAt retorna a posição de uma string na lista
        }


        let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);   // % é um operador que captura o resto de uma divisão (Utilizado operador ternário pois fica mais sucinto que o if/else)

        //Validação do primeiro digito
        if(resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0; // não precisa colocar o tet novamente pois essa variável já foi declarada anteriormente.
        numeros = cpf.substring(0, 10); // não precisa colocar o tet novamente pois essa variável já foi declarada anteriormente.

        for (let k = 11; k > 1; k--) {
            soma+= numeros.charAt(11 - k) * k;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        //Validação do segundo dígito
        if(resultado != digitos.charAt(1)){
            return false;
        }

        return true;
    }
}



function  validacao() {
    console.log('Iniciando validação CPF');

    let cpf = document.getElementById('cpf_digitado').value; //pega o valor dentro do componente com o id indicado.

    let resultadoValidacao = validaCPF(cpf);

    if(resultadoValidacao) { 
        document.getElementById('cpf_digitado').value
    }
    else{
        document.getElementById('cpf_digitado').value = alert('CPF Inválido, por favor digite novamente');
        limparCpf();
    }

}

document.getElementById('cpf_digitado').addEventListener('focusout', validacao);


























