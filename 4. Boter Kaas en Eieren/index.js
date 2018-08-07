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
	if(gameInProgress && arrayVakjes[number].classList.length == initSquareClassListLength){
		if(beurtX){
			arrayVakjes[number].classList.add("x")
		} else{
			arrayVakjes[number].classList.add("o")
		}
		if(checkWinaar()){
			gameInProgress = false
		}else if(activeAI){
			turnAI(number)
		}else{
			changeTurn()
		}
	}	
}

function changeTurn(){
	beurtX = !beurtX
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
		return true	
	}
	
	for(i = 0; i < arrayVakjes.length; i++){
		if(arrayVakjes[i].classList.length == initSquareClassListLength){
			return false
		}
	}
	messageText.nodeValue = "It's a draw!"
	return true
}

function checkRows(){
	for(i = 0; i<3;i++){
		if(checkVakje(i*3) && checkVakje(i*3+1) && checkVakje(i*3+2)){
			return true
		}
	}
	return false
}

function checkColumns(){
	for(i = 0; i<3;i++){
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

let numbers = []
let oppositeCorner = {0:8,8:0,2:6,6:2}

function turnAI(number){
	numbers.push(number)
	
	if(numbers[0] == 4){
		arrayVakjes[0].classList.add("o") //random corner
		if(numbers[1] == 8){
			arrayVakjes[2].classList.add("o")
		}
		// blocking()
		
	}else{
		arrayVakjes[4].classList.add("o")
		if(numbers[0] in oppositeCorner){
			if(numbers[1] == oppositeCorner[numbers[0]]){
				arrayVakjes[1].classList.add("o")//random edge
			} 
			// blocking()
		}else{
			if(!checkAanliggend(numbers[0],numbers[1])){
				console.log("niet aanliggend")
				//corner: andere niet aanliggende (niet deze of aanliggend)
				//edge: aanliggende corner (niet tussenin)
			}
			// blocking()
		}
		
	}

}

function checkAanliggend(num1,num2){
	if(num1 / 3 == num2 / 3 & Math.abs(num1 % 3 - num2 % 3) == 1){
		return true // row
	} else if(num1 % 3 == num2 % 3 & Math.abs(num1 / 3 - num2 / 3) == 1){
		return true // column
	}
	return false
}

