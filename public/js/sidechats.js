//sidechats.js;
import {
    socket
    // url,
    // styles,
    // inviteModalScreen,
    // inviteModalMessageBox,
    // inviteModalMessageBoxTitle,
    // noSpaces,
    // screenname,
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
	console.log(message)
	sidechatMessages.innerHTML+=`
		<div class="messageObj">
			 <a href="#" class="messageObj--screenname"><div >PacMan22:</div></a>
			 <div class="messageObj--message">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ullam, eaque, impedit, repellat veritatis tempora sint cum incidunt earum iste nulla placeat corrupti modi harum perferendis quisquam inventore fugit molestias?</div>
			 <div class="messageObj--image x">${message}</div>
		</div>
	`
	// socket.on('scInfo',(data)=>{
	// 	var sidechat1Socket = io(`/${data.receiver}`);
	// 	console.log(sidechat1Socket)
	// })
	// socket.emit('message-sidechat1',data)
})

