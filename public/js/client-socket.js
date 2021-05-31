import {
    socket,
    url,
    styles,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime
} from "./signin-modal.js";
const p = console.log;
const chatArea = document.getElementById("chat-area"),
    mainchatExpand = document.getElementById("mainchat-expand"),
    mainchatSendButton = document.getElementById("mainchat-sendButton"),
    mainchatInput = document.getElementById("mainchat-input"),
    mainchatMessageArea = document.getElementById("mainchat-messageArea");
mainchatMessageArea.innerHTML = "";
mainchatSendButton.addEventListener("click", (e) => {
    e.preventDefault();
    p(mainchatInput.value)
    if (mainchatInput.value.length > 3) {
        socket.emit('message.chat', {
            // screenname: noSpaces(mdlScreenNameInput.value) || mdlScreenNameInput.placeholder,
            // message: scMessageInput.value,
            // action: "a message was sent"
            screenname,
            message: mainchatInput.value,
            image: null
        })
    }
    mainchatInput.value = "";
})
socket.on('chat', (data) => {
    mainchatMessageArea.innerHTML += `
        <div class="messageObj ${socket.id==data.socketInfo?"":"others-message"}">
             <a href="#" class="messageObj--screenname"><div >${data.screenname}:</div></a>
             <div class="messageObj--message">${data.message}</div>
             <div class="messageObj--image x">${data.image}</div>
        </div>
    `;
    var links = Array.from(document.getElementsByClassName("messageObj--screenname"));
    links.forEach((link) => {
        link.addEventListener("click", function(e) {
            let receiver = link.innerText;
            e.preventDefault();
            console.log(receiver);
            chatArea.classList.add('main_sidechat1_open');
            // socket.emit('getid')
            socket.emit('message-invite', {
                sender: screenname,
                senderid: socket.id,
                receiver
            })
        })
    })
})
const sidechatExpand = document.getElementById("sidechat-expand");
sidechatExpand.addEventListener('click', function() {
    chatArea.classList.replace('main_sidechat1_open', 'main_sidechat1_openExpanded');
})
mainchatExpand.addEventListener('click', function() {
        
    if (chatArea.classList.contains('main_sidechat1_openExpanded')) {
        chatArea.classList.replace('main_sidechat1_openExpanded', 'main_sidechat1_closeExpanded');
    } else{
        chatArea.classList.replace('main_sidechat1_closeExpanded',"main_sidechat1_close");
    }
})