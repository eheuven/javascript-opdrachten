import index from './index.js'

let oppositeCorner = {0:8,8:0,2:6,6:2}
let numbers = []
let eigenZetten = []

function turnAI(number){
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
		index.addClassO(vakjeKeuze)
		eigenZetten.push(vakjeKeuze)
		vakjeKeuze = null
		index.checkWinaar()
	}
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
	for(let i = 0; i < Object.keys(oppositeCorner).length; i++){
		if(checkAanliggend(numbers[0],Object.keys(oppositeCorner)[i]) 
			& oppositeCorner[i] != numbers[1]
		){
			return Object.keys(oppositeCorner)[i]
		}
	}
}

function edgeEdgeTactiek(){
	for(let i = 0; i < Object.keys(oppositeCorner).length; i++){
		if(checkAanliggend(numbers[0],Object.keys(oppositeCorner)[i])
			& !checkAanliggend(numbers[1],Object.keys(oppositeCorner)[i])
		){
			return Object.keys(oppositeCorner)[i]
		} 
	}
}

function winningMove(){	

	for(let i = 0; i < eigenZetten.length-1; i++){
		let winnendeZet = geefVolgendeInVerlengde(eigenZetten[i],eigenZetten[eigenZetten.length-1])
		if(index.isLeegVakje(winnendeZet)){
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

	for(let vakNr = 0; vakNr < index.getArrayVakjes().length;vakNr++){
		if(index.isLeegVakje(vakNr) & vakNr != num1 & vakNr != num2
			& ((Math.trunc(num1 / 3) == Math.trunc(num2 / 3) & Math.trunc(vakNr / 3) == Math.trunc(num1 / 3)
				)||(Math.trunc(num1 % 3) == Math.trunc(num2 % 3) & Math.trunc(vakNr % 3) == Math.trunc(num1 % 3)	
		))){return vakNr}
	}
}

function blocking(){
	for(let i = 0; i < numbers.length-1; i++){
		let blokkeerZet = geefVolgendeInVerlengde(numbers[i],numbers[numbers.length-1])
		if(index.isLeegVakje(blokkeerZet)){
			return blokkeerZet
		}
	}
}

function randomChoice(){
	for(let i = 0; i < 9; i++){ // meer keuze
		if(index.isLeegVakje(i)){
			for(var j = 0; j < eigenZetten.length; j++){
				if(index.isLeegVakje(geefVolgendeInVerlengde(i,eigenZetten[j]))){
					return geefVolgendeInVerlengde(i,eigenZetten[j])
				}
			}
			
		}
	}

	for(let vakNr = 0; vakNr < 9; vakNr++){ // 2 keuze
		if(index.isLeegVakje(vakNr)){
			return vakNr
		}
	}
}

export default {turnAI}
	