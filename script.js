var itemEscolhido = 0;
var totalAcertos = 0;
var totalQuestoes = 0;
var count = 0;
var nome = totalAcertos + "/" + 3*totalQuestoes; 
var content;
var obj;
var ini = true;

window.onload = function conecta(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function (e) {
        if (xhttp.readyState === 4 && xhttp.status === 200){
            content = xhttp.responseText;
        }
        else{
            var err0 = xhttp.statusText;
        }
    };
    xhttp.open("GET", "https://quiz-trainee.herokuapp.com/questions", true);
    xhttp.send();
}



function setNum(numero){
    itemEscolhido = numero;
}


function proxima(){
    if(ini === true) inicializa();
    if(itemEscolhido===0);
    else{
        contaPontos(itemEscolhido - 1, count);
        totalQuestoes = totalQuestoes + 1;
        document.getElementById("placar").textContent = totalAcertos + "/" + 3*totalQuestoes;
        itemEscolhido = 0;
        for(var j=0; j<4; j++){
            document.getElementsByTagName("input")[j].checked = false;
        }
        count++;
        if(count===obj.length) reinicializa();
        else plotaTexto(count);
 
    }
}
//faz os itens a serem marcados aparecerem.
function inicializa(){
    totalAcertos = 0;
    totalQuestoes = 0;
    document.getElementById("valores").style.display = "none";
    document.getElementById("placar").textContent = totalAcertos + "/" + 3*totalQuestoes;
    obj = JSON.parse(content);
    for(var i=0; i<4; i++){
        document.getElementsByClassName("itemCheck")[i].style.display = "block";
    }
    plotaTexto(0);
    ini = false;
}
//faz o jogo voltar do começo
function reinicializa(){
    for(var i=0; i<4; i++){
        document.getElementsByClassName("itemCheck")[i].style.display = "none";
    }
    document.getElementsByTagName("h1")[0].textContent = "Valores do quiz da gti";
    document.getElementById("valores").textContent = "sua pontuação: " + ((totalAcertos/(3*totalQuestoes))*100) + "%";
    document.getElementById("valores").style.display = "block";
    ini = true;
    count = 0;
}
//conta os pontos de acordo com as respostas do usuário.
function contaPontos(resp, n){
    if(obj[n].options[resp].value === 3){
        document.body.style.backgroundColor = "#17A328";
        totalAcertos += 3;
    }
    else if(obj[n].options[resp].value === 2){
        document.body.style.backgroundColor = "#33D947";
        totalAcertos += 2;
    }
    else if(obj[n].options[resp].value === 1){
        document.body.style.backgroundColor = "#D9913F";
        totalAcertos += 1;
    }
    else{
        document.body.style.backgroundColor = "red";
        totalAcertos += 0;
    }
}
//Escreve os textos de cada questão e seu título.
function plotaTexto(n){
    document.getElementsByTagName("h1")[0].textContent = obj[n].title;
    document.getElementById("l1").textContent = obj[n].options[0].answer;
    document.getElementById("l2").textContent = obj[n].options[1].answer;
    document.getElementById("l3").textContent = obj[n].options[2].answer;
    document.getElementById("l4").textContent = obj[n].options[3].answer;
}