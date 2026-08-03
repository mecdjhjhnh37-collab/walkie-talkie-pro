const socket = io();

let username = "";
let currentRoom = "المحادثة العامة";

const loginPage = document.getElementById("loginPage");
const roomsPage = document.getElementById("roomsPage");
const chatPage = document.getElementById("chatPage");

const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");

const newRoomBtn = document.getElementById("newRoom");
const rooms = document.getElementById("rooms");

const roomName = document.getElementById("roomName");

const messages = document.getElementById("messages");
const message = document.getElementById("message");
const send = document.getElementById("send");

const back = document.getElementById("back");

loginBtn.onclick = () => {

    if(usernameInput.value.trim()==""){
        alert("اكتب اسمك");
        return;
    }

    username = usernameInput.value;

    loginPage.classList.add("hidden");
    roomsPage.classList.remove("hidden");

}

newRoomBtn.onclick = ()=>{

    const room = prompt("اسم الغرفة");

    if(!room) return;

    const div=document.createElement("div");

    div.className="room";

    div.innerHTML="🔒 "+room;

    div.onclick=()=>joinRoom(room);

    rooms.appendChild(div);

}

document.querySelector(".room").onclick=()=>{

    joinRoom("المحادثة العامة");

}

function joinRoom(room){

    currentRoom=room;

    roomName.innerHTML=room;

    roomsPage.classList.add("hidden");

    chatPage.classList.remove("hidden");

    messages.innerHTML="";

    socket.emit("join-room",{

        roomId:room,

        username

    });

}

send.onclick=sendMessage;

message.addEventListener("keypress",(e)=>{

    if(e.key==="Enter") sendMessage();

});

function sendMessage(){

    if(message.value.trim()=="") return;

    socket.emit("send-message",message.value);

    message.value="";

}

socket.on("receive-message",(data)=>{

    const div=document.createElement("div");

    div.className="message";

    div.innerHTML=`
        <b>${data.username}</b><br>
        ${data.message}<br>
        <small>${data.time}</small>
    `;

    messages.appendChild(div);

    messages.scrollTop=messages.scrollHeight;

});

back.onclick=()=>{

    chatPage.classList.add("hidden");

    roomsPage.classList.remove("hidden");

};
