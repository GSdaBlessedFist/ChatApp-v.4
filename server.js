const express = require('express');
const app = express();
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');
// const server = require('http').Server(app);
const socket = require('socket.io');
const chalk = require('chalk');

const port = process.env.PORT || 3400;
const server = app.listen(port, () => {
  console.log(`Red to go on port ${port}!`)
});
const nameofApp = "BlahBlahBlog";

app.use(express.static('public'));
// app.use(morgan('tiny'));

// Express config
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./src/templates/views");
const partialsPath = path.join(__dirname, "./src/templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res)=>{
    res.render("index",{
            title: nameofApp,
            clientname: "clientName"
    })
})

const io = socket(server);
var clientNum = 0;
var currentUsers = [];
//Whenever someone connects this gets executed
io.on('connection', function(socket) {

   clientNum++;
   
   socket.on('add-client',(data)=>{
        currentUsers.push(data);
        console.log(chalk.bgGreen.black.bold("Introducing..."+data.screenname))
        console.log(currentUsers);



        socket.emit('number-assignment',clientNum);
    })

    socket.on('message.chat',(data)=>{//<---
        // console.log(data)
        io.sockets.emit('chat',{
            socketInfo :socket.id,
            screenname: data.screenname,
            message: data.message,
            image: data.image
        });
    })
    socket.on('message-invite',(data)=>{
        //.sender,.senderid,.receiver
        console.log(`${data.sender} is INVITING ${data.receiver}`);
        console.log(data)
        console.log("This one:"+currentUsers[0].socketinfo)
        function matchUserToSocket(){
            let targetUser = data.receiver;
            let found = currentUsers.find((user)=>{
                return user.socketinfo === targetUser;
            })
            console.log(found);
        }
        matchUserToSocket()  //<----
        
        
        // io.to(matchUserToSocket().socketInfo).emit('invite',data);
        // io.to(data.socketInfo).emit('invite',data);
    })
        
    socket.on('invite-acceptance',(data)=>{
        console.log(currentUsers)
        console.log(`${data.receiverOfInvite} has accepted a sidechat invite from ${data.senderOfInvite}` )
        function matchUserToSocket(){
            let targetUser = data.senderOfInvite;
            let found = currentUsers.find((user)=>{
                return user.screenname === targetUser;
            })
            return found;
        }
        io.to(matchUserToSocket().socketinfo).emit('accept-join',{
            receiverOfInvite: data.receiverOfInvite,
            senderOfInvite: data.senderOfInvite
        })
    })

   socket.on('disconnect', () => {
    clientNum--;
   });
});


