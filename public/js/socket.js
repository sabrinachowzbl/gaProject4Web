//Make connection to socket
var socket = io('/game');
socket.on('hi', function(data) {
    alert(data);
})

//Query DOM


//Emit Events
function changedObject () {
    console.log('client side changed object');
    socket.emit('changedObj', {drawings: objArr});
}

//receive events 
socket.on('changedObj', function (data) {
    sideBarSetup();
    objArr = data.drawings;
})
