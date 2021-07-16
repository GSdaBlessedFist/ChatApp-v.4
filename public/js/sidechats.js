//sidechats.js;
import {
    socket,screenname
    // url,
    // styles,
    // inviteModalScreen,
    // inviteModalMessageBox,
    // inviteModalMessageBoxTitle,
    // noSpaces,
    // lazyFadeOutTime,
    // quickFadeOutTime
} from "./signin-modal.js";

const sideChat1SendButton= document.getElementById("sidechat1-send-button"),
	  sideChat2SendButton= document.getElementById("sidechat2-send-button"),
	  sidechat1Input= document.getElementById("sidechat1-input"),
	  sidechat2Input= document.getElementById("sidechat2-input"),
	  sidechatMessages= document.getElementById("sidechat1-messages");



sideChat1SendButton.addEventListener('click',(e)=>{
	e.preventDefault();
	
	let message = sidechat1Input.value;
	console.log(message);
	socket.emit('sidechat-message',{//<-- 1
		screenname,
        message: sidechat1Input.value,
        image: null
	});
	
socket.on('sidechat-chat',(data)=>{//<--
	//screenname,message,roomTag,image
	console.log("data.roomTag")
	sidechatMessages.innerHTML+=`
		<div class="messageObj ${socket.id==data.socketInfo?"":"others-message"}">
             <a href="#" class="messageObj--screenname"><div >${data.screenname}</div></a>
             <div class="messageObj--message">${data.message}</div>
             <div class="messageObj--image x">${data.image}</div>
        </div>
	`
})

socket.on('partner-info',(data)=>{
	alert(data.partner)
})


	// socket.on('scInfo',(data)=>{
	// 	var sidechat1Socket = io(`/${data.receiver}`);
	// 	console.log(sidechat1Socket)
	// })
	// socket.emit('message-sidechat1',data)
})

