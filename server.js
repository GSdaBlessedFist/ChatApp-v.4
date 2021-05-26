const express = require('express');
const app = express();
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3400;
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

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   socket.emit('welcome',{message:"Welcome"})


   socket.on('disconnect', () => {
    console.log('user disconnected');
   });
});

app.listen(port, () => {
  console.log(`Red to go on port ${port}!`)
});
