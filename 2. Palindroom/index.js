const invoer = document.getElementById("invoer")
const message = document.getElementById("message")
const list = document.getElementById("list")
const button = document.getElementById("check-button")

button.addEventListener("click",isPalindrome)

function isPalindrome(){
	let listItem = document.createElement("LI")
	list.appendChild(listItem)
	
	for(let i = 0; i < invoer.value.length/2; i++){
		if(invoer.value.charAt(i) != invoer.value.charAt(invoer.value.length-(i+1))){
			let itemText = document.createTextNode(invoer.value + ": false")
			listItem.appendChild(itemText)
			return 
		}
	}
	let itemText = document.createTextNode(invoer.value + ": true")
	listItem.appendChild(itemText)
}

