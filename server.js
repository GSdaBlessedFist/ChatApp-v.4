const p = console.log;
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
  console.log("empty room")
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
app.get("/", (req, res) => {
  res.render("index", {
    title: nameofApp,
    clientname: "clientName"
  })
})
const io = socket(server);
var clientNum = 0;
var currentUsers = [];
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  socket.on('add-client', (data) => {
    clientNum++;
    console.log('currentUsers: ' + clientNum);
    currentUsers.push(data);
    console.log(chalk.bgGreen.black.bold("Introducing..." + data.screenname))
    console.log(currentUsers);
    socket.emit('number-assignment', clientNum);
  })
  socket.on('message.chat', (data) => { //<---
    // console.log(data)
    io.sockets.emit('chat', {
      socketInfo: socket.id,
      screenname: data.screenname,
      message: data.message,
      image: data.image
    });
  })
  socket.on('message-invite', (data) => {
    //.sender,.senderid,.receiver
    console.log(data);
    console.log(chalk.yellow.bold(data.sender)+` is INVITING `+chalk.green.bold(data.receiver));
    console.log(chalk.yellow(`SENDER socketId: ${data.sendersocketinfo}`));
    function targetUser() {
      var theUser = currentUsers.find((user) => {
        return user.screenname === data.receiver;
      })
      return theUser.socketinfo;
    }
    console.log(chalk.yellow.bold(data.sender)+`'s invite has been received by `+chalk.green.bold(data.receiver));
    console.log(chalk.green(`RECEIVER socketId: ${targetUser()}`));
    // console.log(data.receiver);
    // console.log(targetUser());
    io.to(targetUser("r")).emit('invite',{...data,receiverId:targetUser()});
    // socket.broadcast.to(targetUser).emit('accept-join', data);
  })
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  socket.on('invite-acceptance', (data) => {
    // console.log(currentUsers);
    console.log(chalk.green.bold(data.receiver)+ ` has accepted a sidechat invite from `+ chalk.yellow.bold(data.sender));
    function targetUser() {
      var theUser = currentUsers.find((user) => {
        return user.screenname === data.sender;
      })
      return theUser.socketinfo;
    }
    
    socket.broadcast.to(targetUser()).emit('accept-join', data);
    
  })

  socket.on("decline-sidechat",(data)=>{
    console.log(chalk.red.bold(`Oooh..${data.receiver} has declined a sidechat with ${data.sender}`));
    socket.emit('decline-notification',data);
  })

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var sidechat2Partner = null;

socket.on('join-sidechat',(data)=>{
  //{sender,receiver,receiverId}
  let sidechat1Partner = data.receiver;
  const roomTag = `side-chat-${data.receiverId}`;

  // function targetUser(x) {
  //     var theUser = currentUsers.find((user) => {
  //       if(x==="s"){
  //         return user.screenname === data.sender;
  //       }else{
  //         if(x==="r")return user.screenname === data.receiver;  
  //       }
        
  //     })
  //     return theUser.socketinfo;
  //   }
  console.log(sidechat1Partner)
  console.log(`Sidechat roomname: ${roomTag}`)
  socket.join(roomTag);

  
  
})

socket.on('sidechat-message',(data)=>{
    //{screenname,message,image}  <---- stop point
    console.log(data)
    function targetUser(data) {
      var theUser = currentUsers.find((user) => {
        return user.screenname === data.receiver;
      })
      return theUser.socketinfo;
    }
    console.log(targetUser());
    let roomTag = targetUser();
    console.log("maybee")
    // console.log(roomTag)
    // socket.broadcast.to(roomTag).emit('sidechat-chat',{
    io.sockets.in(roomTag).emit('sidechat-chat',{
      screenname : data.sender,
      message : data.message,
      roomTag,
      image: data.image
    })
    console.log("data")
  })
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

  // socket.on('sidechat1-message',(data)=>{
  //   function targetUser() {
  //     var theUser = currentUsers.find((user) => {
  //       return user.screenname === data.sender;
  //     })
  //     console.log(data)
  //     console.log("Array.from[theUser]")
  //     return theUser.socketinfo;
  //   }
  //   console.log(`Sidechat1 message: ${data.message}`);


    // io.sockets.socket(targetUser(data)).
    // io.sockets.emit('sidechat-chat', {
    //   socketInfo: socket.id,
    //   screenname: data.screenname,
    //   message: data.message,
    //   image: data.image
    // });
    ////////////////////
    // function targetUser() {
    //   var theUser = currentUsers.find((user) => {
    //     return user.screenname === data.sender;
    //   })
    //   console.log(theUser.socketinfo)
    //   return theUser.socketinfo;
    // }
    // console.log("printer")
    // targetUser();
    /////////////////////////////
    // io.to(targetUser()).emit('sidechat-chat', {
    //   socketInfo: socket.id,
    //   screenname: data.screenname,
    //   message: data.message,
    //   image: data.image
    // });

  // })

  socket.on('disconnect', () => {
  clientNum--;
  if (clientNum === 0) {
    currentUsers = [];
    console.log("empty room");
  } else {
    console.log('currentUsers: ' + clientNum);
  }
});
  
})
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
