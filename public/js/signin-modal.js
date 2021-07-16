//signin.js;
sessionStorage.clear(); 
const a = alert;
const p = console.log;
const url = "http://localhost:3400";
// const socket = io.connect(url);
const socket = io();
document.title += "" ;
var clientNumber;


const signinModal= document.getElementById("signin-modal"),
      siginModalScreen= document.getElementById("sigin-modal-screen"),
	  signinModalMessageBox= document.getElementById("signin-modal-message-box"),
	  signinModalMessageBoxInput= document.getElementById("signin-modal-message-box--input"),	  
      inviteModalScreen= document.getElementById("invite-modal-screen"),
      inviteModalMessageBox= document.getElementById("invite-modal-message-box"),
      inviteModalMessageBoxTitle= document.getElementById("invite-modal-message-box_title");
inviteModalScreen.style.display="none";
inviteModalMessageBox.style.display="none";


const styles = getComputedStyle(document.documentElement);
const lazyFadeOutTime = styles.getPropertyValue('--lazy').slice(0, -1);
const quickFadeOutTime = styles.getPropertyValue('--quick').slice(0,-1);

////////////// SETTING DEFAULT SCREENNAME //////////////
const randomDefaultScreenNames = ["TypieTech", "Cesars_Salad", "Lazarus_Lu",
    "Salazar_One", "Dollar_Bunny", "Grimmace2020",
    "Plot_Lover", "Kill_em_with_wine-ness"
];
const randomNameSelection = function() {
    return randomDefaultScreenNames[Math.floor(Math.random() * randomDefaultScreenNames.length)];
}
const noSpaces = function(str) {
    let x = str.replace(/ /g, "_").trim();
    return x;
}
// signinModalMessageBoxInput.placeholder = randomNameSelection();
// const screenname = noSpaces(signinModalMessageBoxInput.value) || signinModalMessageBoxInput.placeholder;

signinModalMessageBoxInput.placeholder = randomNameSelection();
var screenname = signinModalMessageBoxInput.placeholder;

signinModalMessageBoxInput.addEventListener('change',(e)=>{
    e.preventDefault();
    screenname = noSpaces(e.target.value)
    return null;
});




//////////////////////// COMMs ////////////////////////
document.body.addEventListener("keyup", (e) => {
	
	if (e.keyCode === 13 && signinModal.style.opacity!==0) {
    // if (e.keyCode === 13 && signinModal.style.display=="block") {
        p("TEST")
        socket.emit("add-client", {
            screenname,
            socketinfo: socket.id

        })
        p("%cUsername registered","color:green;font-size:1.25em");
        gsap.to(signinModalMessageBox,{opacity:0,duration:lazyFadeOutTime});
        gsap.to(siginModalScreen,{opacity:0,duration:lazyFadeOutTime,delay:.45});

        /////////// CLOSES SIGNIN MODAL ///////////
        setTimeout(()=>{
            signinModal.classList.add("x");
            signinModal.remove();
        },lazyFadeOutTime)
    }
    // document.title += " - "+screenname; <--THIS ONE FINAL
    document.title = screenname +" : "+socket.id; //<--testING
    document.getElementById("mainchat-input").autofocus=true;
    
})
        

        
    // document.title += " - "+screenname; <--THIS ONE FINAL
    document.title = screenname +" : "+socket.id; //<--testING
    document.getElementById("mainchat-input").autofocus=true;
    




export {
	url,
	socket,
	styles,
    inviteModalScreen,
    inviteModalMessageBox,
    inviteModalMessageBoxTitle,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime
}




