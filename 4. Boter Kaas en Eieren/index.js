import AI from './AI.js'

const message = document.getElementById("message")
const arrayVakjes = document.querySelectorAll(".square")
let initSquareClassListLength = arrayVakjes[0].classList.length
let activeAI = true

for(let i = 0; i < arrayVakjes.length; i++){
	arrayVakjes[i].addEventListener("click",function(){select(i)})	
}

let beurtX = true
let messageText = document.createTextNode("Turn of X")
message.appendChild(messageText)
let gameInProgress = true

if (activeAI){
	messageText.nodeValue = "Tic-Tac-Toe against AI"
}


function select(number){
	if(gameInProgress && isLeegVakje(number)){
		if(beurtX){
			arrayVakjes[number].classList.add("x")
		} else{
			arrayVakjes[number].classList.add("o")
		}
		
		checkWinaar()
		
		if(gameInProgress){
			if(activeAI){
				AI.turnAI(number)
			}else{
				changeTurnText()
			}
		}
	}	
}

function changeTurnText(){
	veranderBeurt()
	let text = "Turn of "
	if(beurtX){text += "X"}
	else{text += "O"}
	messageText.nodeValue = text
}

function checkWinaar(){
	if(checkRows() || checkColumns() || checkDiagonal()){
		if(beurtX){var speler = "X"}
		else{var speler = "O"}
		messageText.nodeValue = speler + " wins!"
		gameInProgress = false
		return 
	}
	
	for(let i = 0; i < arrayVakjes.length; i++){
		if(isLeegVakje(i)){
			veranderBeurt()
			return 
		}
	}
	messageText.nodeValue = "It's a tie!"
	gameInProgress = false
	return 
}

function checkRows(){
	for(let i = 0; i<3;i++){
		if(checkVakje(i*3) && checkVakje(i*3+1) && checkVakje(i*3+2)){
			return true
		}
	}
	return false
}

function checkColumns(){
	for(let i = 0; i<3;i++){
		if(checkVakje(i) && checkVakje(i+3) && checkVakje(i+6)){
			return true
		}
	}
	return false
}

function checkDiagonal(){
	if((checkVakje(0) && checkVakje(4) && checkVakje(8)
		)||(checkVakje(2) && checkVakje(4) && checkVakje(6)
	)){
		return true
	}
}

function checkVakje(index){
	if(beurtX){var speler = "x"}
	else{var speler = "o"}
	return arrayVakjes[index].classList.contains(speler)
}

function isLeegVakje(vaknr){
	if(vaknr != undefined){
		return arrayVakjes[vaknr].classList.length == initSquareClassListLength
	}
	return false
}

function getArrayVakjes(){
	return arrayVakjes
}

function addClassO(vakjeKeuze){
	arrayVakjes[vakjeKeuze].classList.add("o")
}


export default {
	isLeegVakje,
	addClassO,
	getArrayVakjes,
	checkWinaar
}
