"use struct";
//Selecionando elementos que serão manipulados
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

//Seleção do campo telefone
//const campoTelefone=formulario.querySelector("#telefone");
 const campoTelefone=$("#telefone");
$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");

//Detectar o evento de click
botaoBuscar.addEventListener("click", async function (event) {
    event.preventDefault();
    // Verificando se o cep não tem 8 digitos
    let cep;

    if (campoCep.value.length !== 9) {
        mensagem.textContent = "Digite um cep válido!";
        mensagem.style.color = "purple";
        
        //Parar a execução do código
        return;
    } else {
        cep = campoCep.value;

    }
    //Tecnica de comunicação assíncrona para acessar uma API(www.viacep.com.br)

    //Etapa 1- preparar  a URL da API com o cep digitado
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    //Etapa 2- Acessar API com url e aguardar o retorno dela 
    const resposta = await fetch(url);
    //Etapa 3- Extrair os dados da respota em formato JSON
    const dados = await resposta.json();
    //Etapa 4-Lidar com os dasdos  de resposta  em caso de erro ou 
    if ("erro" in dados) {
        mensagem.textContent = "Cep inexistente!";
        mensagem.style.color = "red";
        
    }else{
     mensagem.textContent="cep encontrado!";
     mensagem.style.color="green"; 

     campoEndereco.value= dados.logradouro; 
     campoBairro.value=dados.bairro;  
     campoCidade.value= dados.localidade; 
     campoEstado.value=dados.uf;  
    }

});