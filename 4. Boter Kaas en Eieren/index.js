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
		if(isLeegVakje(i)){
			return false
		}
	}
	messageText.nodeValue = "It's a tie!"
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

let oppositeCorner = {0:8,8:0,2:6,6:2}
let numbers = []
let eigenZetten = []

function turnAI(number){
	beurtX = false
	numbers.push(number)
	
	let vakjeKeuze = undefined
	
	if(numbers.length == 1){
		if(numbers[0] == 4){
			vakjeKeuze = 0 // corner of choice
		}else{
			vakjeKeuze = 4 // center
		}
	}else if(numbers.length == 2){
		if(numbers[0] == 4){
			vakjeKeuze = centerTactiek()
		}else{
			if(numbers[0] in oppositeCorner){
				vakjeKeuze = cornerTactiek()
			}else{
				vakjeKeuze = edgeTactiek()
			}
		}
	}
	
	if(vakjeKeuze == undefined){
		vakjeKeuze = winningMove()
	}
	if(vakjeKeuze == undefined){
		vakjeKeuze = blocking()
	}
	if(vakjeKeuze == undefined){
		vakjeKeuze = randomChoice()
	}
	
	if(vakjeKeuze != undefined){
		arrayVakjes[vakjeKeuze].classList.add("o")
		eigenZetten.push(vakjeKeuze)
		vakjeKeuze = null
		gameInProgress = !checkWinaar()
	}
	beurtX = true
}

function centerTactiek(){
	if(numbers[1] == oppositeCorner[0]){
		return 2 //corner of choice
	}
}

function cornerTactiek(){
	if(numbers[1] == oppositeCorner[numbers[0]]){
		return 1 //edge of choice
	}else if(checkAanliggend(4,numbers[1]) & !checkAanliggend(numbers[0],numbers[1])){
		return oppositeCorner[numbers[0]]
	}
}

function edgeTactiek(){
	if(numbers[1] in oppositeCorner & !checkAanliggend(numbers[0],numbers[1])){
		return edgeCornerTactiek()
	}else if(checkAanliggend(4,numbers[1])){
		return edgeEdgeTactiek()
	}
}

function checkAanliggend(num1,num2){
	if(Math.trunc(num1 / 3) == Math.trunc(num2 / 3) & Math.abs(num1 % 3 - num2 % 3) == 1){
		return true // row
	} else if(num1 % 3 == num2 % 3 & Math.abs(Math.trunc(num1 / 3 - num2 / 3)) == 1){
		return true // column
	}
	return false
}

function edgeCornerTactiek(){
	for(i = 0; i < Object.keys(oppositeCorner).length; i++){
		if(checkAanliggend(numbers[0],Object.keys(oppositeCorner)[i]) 
			& oppositeCorner[i] != numbers[1]
		){
			return Object.keys(oppositeCorner)[i]
		}
	}
}

function edgeEdgeTactiek(){
	for(i = 0; i < Object.keys(oppositeCorner).length; i++){
		if(checkAanliggend(numbers[0],Object.keys(oppositeCorner)[i])
			& !checkAanliggend(numbers[1],Object.keys(oppositeCorner)[i])
		){
			return Object.keys(oppositeCorner)[i]
		} 
	}
}

function winningMove(){	
	for(i = 0; i < eigenZetten.length-1; i++){
		let winnendeZet = geefVolgendeInVerlengde(eigenZetten[i],eigenZetten[eigenZetten.length-1])
		if(isLeegVakje(winnendeZet)){
			return winnendeZet
		}
	}
}

function geefVolgendeInVerlengde(num1,num2){
	if(num1 == 4 & num2 in oppositeCorner){	
		return oppositeCorner[num2]
	}else if(num2 == 4 & num1 in oppositeCorner){
		return oppositeCorner[num1]
	}else if(num1 in oppositeCorner){
		if(num2 == oppositeCorner[num1]){return 4}
	}
	
	
	for(let vakNr = 0; vakNr < arrayVakjes.length;vakNr++){
		if(isLeegVakje(vakNr) & vakNr != num1 & vakNr != num2
			& ((Math.trunc(num1 / 3) == Math.trunc(num2 / 3) & Math.trunc(vakNr / 3) == Math.trunc(num1 / 3)
				)||(Math.trunc(num1 % 3) == Math.trunc(num2 % 3) & Math.trunc(vakNr % 3) == Math.trunc(num1 % 3)	
		))){return vakNr}
	}
}

function isLeegVakje(vaknr){
	if(vaknr != undefined){
		return arrayVakjes[vaknr].classList.length == initSquareClassListLength
	}
	return false
}

function blocking(){
	for(i = 0; i < numbers.length-1; i++){
		let blokkeerZet = geefVolgendeInVerlengde(numbers[i],numbers[numbers.length-1])
		if(isLeegVakje(blokkeerZet)){
			return blokkeerZet
		}
	}
}

function randomChoice(){
	for(i = 0; i < 9; i++){ // meer keuze
		if(isLeegVakje(i)){
			for(var j = 0; j < eigenZetten.length; j++){
				if(isLeegVakje(geefVolgendeInVerlengde(i,eigenZetten[j]))){
					return geefVolgendeInVerlengde(i,eigenZetten[j])
				}
			}
			
		}
	}

	for(vakNr = 0; vakNr < 9; vakNr++){ // 2 keuze
		if(isLeegVakje(vakNr)){
			return vakNr
		}
	}
}
	

