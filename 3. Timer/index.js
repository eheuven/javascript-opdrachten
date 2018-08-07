const currentTime = document.getElementById("currentscore")
const highscoreTime = document.getElementById("highscore")
let secondsPassed = 0
let minutesPassed = 0
let hoursPassed = 0

setInterval(timer, 1000);
highscoreTime.innerText = localStorage.getItem("highscore")

function timer(){
	updateTime()
	currentTime.innerText = timeFormat()
	
	if(timeFormat().length > localStorage.getItem("highscore").length
		|| (timeFormat().length == localStorage.getItem("highscore").length 
				&& timeFormat()>localStorage.getItem("highscore")
		)){
		localStorage.setItem("highscore",timeFormat())
	}
	
}

function updateTime(){
	secondsPassed ++
	if(secondsPassed == 60){
		secondsPassed = 0
		minutesPassed ++
		if(minutesPassed == 60){
			minutesPassed = 0
			hoursPassed ++
		}
	}
}

function timeFormat(){
	let time = ""
		
	if(hoursPassed != 0){
		if(hoursPassed < 10){time += 0}
		time += hoursPassed + ":"
	}
	
	if(minutesPassed != 0){
		if(minutesPassed < 10){time += 0}
		time += minutesPassed  + ":"
	}
	
	if(secondsPassed < 10){time += 0}
	time += secondsPassed
	return time
}

