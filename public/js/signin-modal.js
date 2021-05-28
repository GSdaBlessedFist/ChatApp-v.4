//signin.js;
const a = alert;
const p = console.log;
p("start")
const url = "http://localhost:3400";
// const socket = io.connect(url);
const socket = io();
var clientNumber;


const signinModal= document.getElementById("signin-modal"),
      siginModalScreen= document.getElementById("sigin-modal-screen"),
	  signinModalMessageBox= document.getElementById("signin-modal-message-box"),
	  signinModalMessageBoxInput= document.getElementById("signin-modal-message-box--input");	  

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
signinModalMessageBoxInput.placeholder = randomNameSelection();
const screenname = noSpaces(signinModalMessageBoxInput.value) || signinModalMessageBoxInput.placeholder;

//////////////////////// COMMs ////////////////////////
document.body.addEventListener("keyup", (e) => {
	
	if (e.keyCode === 13) {
        socket.emit("add-client", {
            screenname,
            socketinfo: socket.id
        })

        gsap.to(signinModalMessageBox,{opacity:0,duration:lazyFadeOutTime});
        gsap.to(siginModalScreen,{opacity:0,duration:lazyFadeOutTime,delay:.45});

        /////////// CLOSES SIGNIN MODAL ///////////
        setTimeout(()=>{
            signinModal.classList.add("x");
        },lazyFadeOutTime)
    }  
})


export {
	url,
	socket,
	styles,
    noSpaces,
    screenname,
    lazyFadeOutTime,
    quickFadeOutTime
}