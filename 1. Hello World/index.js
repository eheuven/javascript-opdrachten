function begroet(){	
	const naamVerwijzing = document.getElementById("naam")
	const begroetingVerwijzing = document.getElementById("begroeting")
	
	begroetingVerwijzing.innerText = "Hello " + naamVerwijzing.value +"!"
}

