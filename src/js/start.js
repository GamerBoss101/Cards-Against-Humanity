
const io = require('socket.io-client');
const socket = io(`http://173.79.124.86:8080`, { reconnect: false, transports: [ "websocket" ] });

// SOCKET 

socket.on('connect', () => {
    console.log("connected renderer"); 
});

socket.on('gameCreated', (data) => {

    localStorage.setItem('game', data.id)
    localStorage.setItem('username', data.username)

    ipcRenderer.send('open-game');
});

socket.on('gameFound', (data) => {

    if(data.status) {
        localStorage.setItem('game', data.id)
        localStorage.setItem('username', data.username)

        ipcRenderer.send('open-game');

    } else {
        Alert(4, "Game Not Found")
    }

});

// START 

document.getElementById("create-btn").onclick = () => {
    Model("Create Game",
    `
    <div style="margin-top:25px; margin-bottom:25px" class="row">
        <div class="input-group flex-nowrap" style="margin-top:20px; margin-bottom:20px;">
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" id="username-box">
        </div>
        <div class="form-group" style="margin-top:20px; margin-bottom:20px;">
            <label for="gameMode">Game Mode</label>
            <select class="form-control" id="gameMode" onchange="gameSelector()">
                <option>Classic</option>
                <option>Family</option>
            </select>
        </div>
        <button style="position:relative; bottom:10%; margin:20px; padding:5px; width:100%; font-size: 18px;" type="button" id="create-game-btn" class="btn btn-success">Create</button>
    </div>
    `, "rgb(41, 41, 41)", () => {
        
        document.getElementById("create-game-btn").onclick = () => {

            let obj = {
                id: makeid(5),
                username: document.getElementById("username-box").value,
                gamemode: document.getElementById("gameMode").value
            }

            socket.emit("createGame", obj)

        }

    })
}

document.getElementById("join-btn").onclick = () => {
    Model("Join Game",
    `
    <div style="margin-top:25px; margin-bottom:25px" class="row">
        <div class="input-group flex-nowrap" style="margin-top:20px; margin-bottom:20px;">
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" id="username-box">
        </div>
        <div class="input-group flex-nowrap" style="margin-top:20px; margin-bottom:20px;">
            <input type="text" class="form-control" placeholder="Join Code" aria-label="Join Code" aria-describedby="addon-wrapping" id="joincode-box">
        </div>
        <button style="position:relative; bottom:10%; margin:20px; padding:5px; width:100%; font-size: 18px;" type="button" id="join-game-btn" class="btn btn-success">Join</button>
    </div>  
    `, "rgb(41, 41, 41)", () => {

        document.getElementById("join-game-btn").onclick = () => {

            socket.emit("findGame", {
                id: document.getElementById("joincode-box").value,
                username: document.getElementById("username-box").value
            })
        }

    })
}

function gameSelector() {
    var seletor = document.getElementById("gameMode").value;
    Alert(3, "Game Mode Selected: " + seletor)
}

const makeid = (length) => {
    var result = [];
    var characters = 'abcdefghijklmnopqrstuvwxyz012345678901234567890123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    
    return result.join('');
}

function Alert(type, text) {
    const box = document.getElementById("alert-box");
    const modelbox = document.getElementById("model-alert-box");
    if(type == 1) box.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
    if(type == 2) box.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
    if(type == 3) modelbox.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`, modelbox.scrollTop = modelbox.scrollHeight;
    if(type == 4) modelbox.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`, modelbox.scrollTop = modelbox.scrollHeight;
    return;
}

function Model(title, content, color, callback) {

    let model = document.getElementById("myModal")
    let modelcontent = document.getElementById("modal-content")

    let finalcolor = color || "rgb(41, 41, 41)"
    let finalcontent = content || "";

    model.style.display = "flex";
    modelcontent.style.display = "block";
    modelcontent.style.backgroundColor = finalcolor;

    modelcontent.innerHTML = 
    `
    <div class="container">
        <h2 style="margin-bottom:10px;" class="gui-title">${title}</h2>
        <div style="z-index: 3; overflow:hidden; max-height:65px; margin:none;" id="model-alert-box"></div>
        ${finalcontent}
    </div>
    `;

    callback();

    document.getElementById("model-background").onclick = (e) => { model.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; }

}
