// ==UserScript==
// @name         Foxes Worklab pacientes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       henrique machado goncalves
// @match        https://app.worklabweb.com.br/pacientepordata.php
// @grant        none
// @include      *.json
// ==/UserScript==
function highlight() {
    let temp = document.getElementById("printableArea").getElementsByTagName("TD");
    let size = temp.length;
    let index = 0;
    let i=0;
    //let json = JSON.parse("{}");
    let json = '{ "pacientes" : ['
    for (index = 11; index < size; index = index + 11){
        //data
        try{
            let init = '{ ';
            let data = '"'+temp[0].innerText+'":"'+temp[index].innerText+'", ';
            //foxesid
            let foxesid = '"'+temp[1].innerText+'":"'+temp[index+1].innerText+'", ';
            //paciente
            let paciente = '"'+temp[2].innerText+'":"'+temp[index+2].innerText+'", ';
            //dtnascimento
            let nascimento = '"'+temp[3].innerText+'":"'+temp[index+3].innerText+'", ';
            //conveio
            let convenio = '"'+temp[5].innerText+'":"'+temp[index+5].innerText+'", ';
            //laboratorio
            let laboratorio = '"'+temp[6].innerText+'":"'+temp[index+6].innerText+'", ';
            //exames
            let exames = '"'+temp[8].innerText+'":"'+temp[index+8].innerText+'" },';
            json = json+init+data+foxesid+paciente+nascimento+convenio+laboratorio+exames;
            console.log(init+data+foxesid+paciente+nascimento+convenio+laboratorio+exames);
            temp[index].setAttribute("style", "background-color: #56f000");
        }
        catch(error){
        }
    }
    //remove last ,
    json = json.slice(0,-1);
    json = json +' ]}'
    let message = JSON.parse(json);
    console.log(message);
    let a = document.createElement("a");
    a.href = "data:text,"+json;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let arquivo = date+".json";
    a.download = arquivo;
    a.click();
}


window.addEventListener('load', function(){
    'use strict';

    let buscaConvenio = document.getElementsByClassName("buscaConvenio");
    let myButton = document.createElement("input");
    myButton.type = "button";
    myButton.value = "download";
    myButton.onclick = () => {
        highlight();
    }
    myButton.classList.add("botao");
    buscaConvenio[0].appendChild(document.createElement('br'));
    buscaConvenio[0].appendChild(myButton);
    buscaConvenio[0].appendChild(myButton);
});
