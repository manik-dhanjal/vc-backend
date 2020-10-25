console.log("hi from script")
var videoCont=document.querySelector(".video-cont video")
console.log(videoCont)
navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>videoHandler(videoCont,stream))

const videoHandler=(video,stream)=>{
video.srcObject=stream;
video.addEventListener("loadedmetadata",e=>{
    video.play();
    console.log(e)
})
}

var socket=io().on("connect",()=>console.log("connected"))