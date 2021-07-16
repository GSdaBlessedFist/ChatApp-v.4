import {
    socket,
    url,
    styles,
    inviteModalScreen,
    inviteModalMessageBox,
    inviteModalMessageBoxTitle,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime
} from "./signin-modal.js";

const p = console.log;
const a = alert;
localStorage.clear();

const chatArea = document.getElementById("chat-area"),
    mainchatExpand = document.getElementById("mainchat-expand"),
    mainchatSendButton = document.getElementById("mainchat-sendButton"),
    mainchatInput = document.getElementById("mainchat-input"),
    mainchatMessageArea = document.getElementById("mainchat-messageArea");
mainchatExpand.style.display = "none";
mainchatMessageArea.innerHTML = "";


var sidechat1Socket;

mainchatSendButton.addEventListener("click", (e) => {
    e.preventDefault();
    // p(mainchatInput.value)
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
             <a href="#" class="messageObj--screenname"><div>${data.screenname}</div></a>
             <div class="messageObj--message">${data.message}</div>
             <div class="messageObj--image x">${data.image}</div>
        </div>
    `;
    var links = Array.from(document.getElementsByClassName("messageObj--screenname"));
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    links.forEach((link) => {
        link.addEventListener("click", function(e) {
            mainchatExpand.style.display = "flex";
            let receiver = link.innerText;
            e.preventDefault();
            console.log(`%cInvited ${receiver} to chat`,"color:teal")
            // console.log(`receiver: ${receiver}`);
            socket.emit('message-invite', {
                sender: screenname,
                sendersocketinfo: socket.id,
                receiver: link.innerText
            })
            

        })
    })
})
///////////////////////////////////////////////////////
socket.on('invite', (data) => {
    var senderOfInvite = data.sender;
    var receiverOfInvite = data.receiver;
    var receiverId = data.receiverId;
    console.log(`%c${senderOfInvite} would like to chat with you.`,"color:teal;font-size:1.25em");
    // gsap.to(inviteModalMessageBox,{opacity:1,duration:lazyFadeOutTime});
    gsap.set(inviteModalScreen, {
        display: "block"
    })
    gsap.set(inviteModalMessageBox, {
        display: "block"
    })
    inviteModalMessageBoxTitle.innerText += `Would you like to chat with ${data.sender}?`
    // gsap.to(inviteModalScreen,{opacity:1,duration:lazyFadeOutTime,delay:.45});
    let yesButton = document.getElementById("yes");
    let noButton = document.getElementById("no");

//--YES-//
    yesButton.addEventListener('click', (e) => {
        // a('yes')
        e.preventDefault();
        socket.emit('invite-acceptance',data)//<--
        
        gsap.to(inviteModalScreen, {
            opacity: 0,
            duration:lazyFadeOutTime
        })
        gsap.to(inviteModalMessageBox, {
            opacity: 0,
            duration:lazyFadeOutTime
        })
        gsap.set(inviteModalScreen,{display:"none"});
        gsap.set(inviteModalMessageBox,{display:"none"})
        //////////////////
            //////////////////
            //////////////////
        if (chatArea.classList.contains('defaultGrid')) {
                chatArea.classList.replace('defaultGrid', 'main_sidechat1_open');
                setTimeout(function() {
                    chatArea.classList.replace('main_sidechat1_open', 'twoChatsGrid');
                }, 1000)
            } else if (chatArea.classList.contains('twoChatsGrid')) {
                chatArea.classList.replace('twoChatsGrid', 'sidechat1_sidechat2_open');
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_open', 'threeChatsGrid');
                }, 1000)
            } else if (chatArea.classList.contains('twoChatsExpandedGrid')) {
                chatArea.classList.replace('twoChatsExpandedGrid', 'sidechat1_sidechat2_openExpanded')
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_openExpanded', 'threeChatsExpandedGrid');
                }, 1000)
            } else if (chatArea.classList.contains('threeChatsGrid')) {
                chatArea.classList.replace('threeChatsGrid', 'sidechat1_sidechat2_openExpanded');
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_openExpanded', 'threeChatsExpandedGrid');
                }, 1000)
            } else {
                if (chatArea.classList.contains('threeChatsExpandedGrid')) {
                    return;
                }
            }
            //////////////////
            //////////////////
            //////////////////
        socket.emit('join-sidechat',{
            sender: senderOfInvite,
            receiver: receiverOfInvite,
            receiverId
        });

    });

//--NO-//
    noButton.addEventListener('click', (e) => {
        a('no...deserving of a monkey pic...a chance for GIMPscapery')
        socket.emit('decline-sidechat',data) 
        gsap.to(inviteModalScreen, {
            opacity: 0,
            duration:lazyFadeOutTime
        })
        gsap.to(inviteModalMessageBox, {
            opacity: 0,
            duration:lazyFadeOutTime
        })
        gsap.set(inviteModalScreen,{display:"none"});
        gsap.set(inviteModalMessageBox,{display:"none"})       
    });
})

socket.on('decline-notification',(data)=>{
    p(`%c${data.receiver} has scoffed at your request to sidechat`,"color:white;font-size:1.25em;background:hsl(30,100%,50%)");
})
//////////////////////////////////////////////////////
socket.on('accept-join',(data)=>{
    p(`%c${data.receiver} has accepted`,"color:white;font-size:1.25em;background:hsl(100,100%,30%)");
  

//////////////////
            //////////////////
            //////////////////
        if (chatArea.classList.contains('defaultGrid')) {
                chatArea.classList.replace('defaultGrid', 'main_sidechat1_open');
                setTimeout(function() {
                    chatArea.classList.replace('main_sidechat1_open', 'twoChatsGrid');
                }, 1000)
            } else if (chatArea.classList.contains('twoChatsGrid')) {
                chatArea.classList.replace('twoChatsGrid', 'sidechat1_sidechat2_open');
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_open', 'threeChatsGrid');
                }, 1000)
            } else if (chatArea.classList.contains('twoChatsExpandedGrid')) {
                chatArea.classList.replace('twoChatsExpandedGrid', 'sidechat1_sidechat2_openExpanded')
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_openExpanded', 'threeChatsExpandedGrid');
                }, 1000)
            } else if (chatArea.classList.contains('threeChatsGrid')) {
                chatArea.classList.replace('threeChatsGrid', 'sidechat1_sidechat2_openExpanded');
                setTimeout(function() {
                    chatArea.classList.replace('sidechat1_sidechat2_openExpanded', 'threeChatsExpandedGrid');
                }, 1000)
            } else {
                if (chatArea.classList.contains('threeChatsExpandedGrid')) {
                    return;
                }
            }
            //////////////////
            //////////////////
            //////////////////    
})
//////////////////////////////////////////////////////






//////////////////////////////////////////////////////
const sidechatExpand = document.getElementById("sidechat-expand");
sidechatExpand.addEventListener('click', function() {
    if (chatArea.classList.contains('threeChatsGrid')) {
        chatArea.classList.replace('threeChatsGrid', 'sidechat1_sidechat2_openExpanded');
        setTimeout(function() {
            chatArea.classList.replace('sidechat1_sidechat2_openExpanded', 'threeChatsExpandedGrid');
        }, 1000)
    } else if (chatArea.classList.contains('twoChatsGrid')) {
        chatArea.classList.replace('twoChatsGrid', 'main_sidechat1_openExpanded');
        setTimeout(function() {
            chatArea.classList.replace('main_sidechat1_openExpanded', 'twoChatsExpandedGrid');
        }, 1000)
    } else {
        return
    }
})
mainchatExpand.addEventListener('click', function() {
    if (chatArea.classList.contains('twoChatsExpandedGrid')) {
        chatArea.classList.replace('twoChatsExpandedGrid', 'main_sidechat1_closeExpanded');
        setTimeout(function() {
            chatArea.classList.replace('main_sidechat1_closeExpanded', 'twoChatsGrid')
        }, 1000);
    } else if (chatArea.classList.contains('threeChatsExpandedGrid')) {
        chatArea.classList.replace('threeChatsExpandedGrid', 'sidechat1_sidechat2_closeExpanded');
        setTimeout(function() {
            chatArea.classList.replace('sidechat1_sidechat2_closeExpanded', 'threeChatsGrid');
        }, 1000);
    } else if (chatArea.classList.contains('twoChatsGrid')) {
        chatArea.classList.replace('twoChatsGrid', 'main_sidechat1_close');
        setTimeout(function() {
            chatArea.classList.replace('main_sidechat1_close', 'defaultGrid');
        }, 1000);
    } else {
        chatArea.classList.replace('threeChatsGrid', 'sidechat1_sidechat2_close');
        setTimeout(function() {
            chatArea.classList.replace('sidechat1_sidechat2_close', 'defaultGrid');
        }, 1000);
    }
});
