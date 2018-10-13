function gerarCor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return 'rgb('+red+', '+green+', '+blue+')';
}


function novoJogo(dificuldade){
    var divs = 0;
    switch(dificuldade){
        case 1:
        divs = 3;
        break;

        case 2:
        divs = 6;
        break;

        case 3:
        divs = 9;
        break;
    }

    var game = {
        gameOn: true,
        color: gerarCor(),
        divs: divs,
        userIsRight:0
    }

    var colorHeader = document.getElementById("colorval");
    var divsHolder = document.getElementById("divsholder");
    var textoCor = document.createTextNode(game.color);
    colorHeader.appendChild(textoCor);
    criarDivs(dificuldade, game.divs, game.color, divsHolder);
}



function criarDivs(dificuldade, numeroDivs, corPrincipal, containerDiv){
    var random = Math.floor(Math.random() * numeroDivs);
    for(var i = 0; i<numeroDivs; i++){
        var newDiv = document.createElement('div');
        newDiv.className += " div-jogo";
        if(i == random){
            newDiv.style.backgroundColor = corPrincipal;
        }
        else{
            newDiv.style.background = gerarCor();
        }
        newDiv.addEventListener("click", function(){
            if(this.style.backgroundColor == corPrincipal){
                newPopup = document.createElement('div');
                newPopup.className += 'frase-ganhou';
                var frases = ['You got it right !', 'You sir, are correct.', "You just probably clicked them all, but yeah it's right...", 'Are you the RGB master?', 'N1 GG!!'];
                newPopup.innerHTML = "<h1>"+frases[Math.floor(Math.random() * (4 - 0 + 1)) + 0]+"</h1><br><button id='popup-reset' class='main-btn btn'>Play Again</button>";
                containerDiv.innerHTML = '';
                containerDiv.appendChild(newPopup);
                //var body = document.querySelector('body');
                //body.insertBefore(newPopup, body.childNodes[0]);
                document.getElementById("popup-reset").addEventListener("click", function(){
                    reiniciarJogo(dificuldade);
                })
            }
            else{
                this.parentNode.removeChild(this);
            }
        })
        containerDiv.appendChild(newDiv);
    }
}


function reiniciarJogo(dificuldade){
    var popupAberta = document.getElementsByClassName('popup-ganhou');
    if(popupAberta.length > 0){
        for(var i = 0, count = popupAberta.length; i<count; i++){
            popupAberta[i].parentNode.removeChild(popupAberta[i]);
        }
    }
    document.getElementById("colorval").innerHTML = '';
    document.getElementById("divsholder").innerHTML = '';
    novoJogo(dificuldade);
}



novoJogo(2);