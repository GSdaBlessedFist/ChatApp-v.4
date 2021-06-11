socket.on('invite', ((data) => {
    var senderOfInvite = data.sender;
    var receiverOfInvite = data.receiver;

    console.log(`${senderOfInvite} would like to chat with you.`);

    mainchatOutputContainer.innerHTML += `
            <!----------------------- SIDECHAT INVITE ----------------------->
        <div class="sidechat-invite" id="sidechat-invite">
            <div class="sidechat-invite--shadow-layer"></div>
            <div class="sidechat-invite--window ">
                Would you like to chat with ${data.sender}?
                <div class="sidechat-button ">
                    <div class="sidechat-button--yes" id="yes">random yes</div>
                    <div class="sidechat-button--no" id="no">random no</div>
                </div>
                
            </div>

        </div>
    `

    
    let yes = document.getElementById("yes");
    let no = document.getElementById("no");

    yes.addEventListener("click", () => {
        localStorage.setItem("recipients", JSON.stringify(
            [
                {user: {screenname: receiverOfInvite, ids: [socket.id] } }
            ]
        ));

        alert(`this is the recipient's id: ${socket.id}`)
        function registerLink(screenname) {
            socket.emit('register', {
                // id: senderOfInvite
                senderOfInvite,//<--- id
                senderOfInviteId: socket.id,//<------
                receiverOfInvite
            })
        }
        registerLink(data.sender);

        document.querySelector('#sidechat-invite').classList.add('hide');
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        socket.emit('invite-acceptance', {
            senderOfInvite: senderOfInvite,
            receiverOfInvite: receiverOfInvite
            //  ^^^^^
        })
        console.log("sender: ".toUpperCase() +data.sender +" & receiver:".toUpperCase()+data.receiver)
        // window.open(`../users/${data.sender}.html`);
        window.open(`sidechat/${senderOfInvite}`);
        console.log(`sidechat/${senderOfInvite} page created`);
    })
    no.addEventListener("click", () => {
        alert('no')
    })
}))