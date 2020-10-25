const express = require("express")
const app = express();
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const bodyParser = require('body-parser');
app.set("view engine","ejs")
app.use(express.static("public"))


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.post("/create-meet",(req,res)=>{
   console.log("from create post",req.body)
    
    res.send("hi")
})

app.post("/join-meet",(req,res)=>{
    console.log("from join post",req.body) 
     res.send("hi")
 })

app.get("/:room",(req,res)=>{
    console.log(req.params.room)
    res.render("room",{roomId:req.params.room})
})

var server=app.listen(process.env.PORT || 8000,()=>{
    console.log("server activated at PORT 8000")
})

const io=require("socket.io")(server)

io.on("connection",socket=>{

   console.log("this is from react")

 socket.on("join-room",(roomId,userId)=>{
   socket.join(roomId)
   socket.to(roomId).broadcast.emit("user-added",userId)
   socket.on("disconnect",()=>{
       socket.to(roomId).broadcast.emit("user-disconnected",userId)
    })
 })
})
