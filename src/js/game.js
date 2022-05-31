

window.onload = async() => {
    
    const obj = localStorage.getItem("game")

    socket.emit('gameLoad', {
        id: localStorage.getItem("game"),
        username: localStorage.getItem("username")
    })

    console.log(obj);
}

function creatorJoin() {

} 

function playerJoin() {
    
} 