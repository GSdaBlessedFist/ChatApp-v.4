// NEEDS WORK

// Detect all clicks on the document
document.addEventListener('click', function (event) {
	let mainchat= document.getElementById("mainchat"),
	  sidechat1= document.getElementById("sidechat1"),
	  sidechat2= document.getElementById("sidechat2");

	switch (event.target){
		case "mainchat" :
			mainchat.className += "r";
			console.log('mainchat selected');
			break;
		case "sidechat1" :
			sidechat1.className += "r";
			break;
		case "sidechat2" :
			sidechat2.className += "r";
			break;
		default :
			return;
	}
	

}, false);

