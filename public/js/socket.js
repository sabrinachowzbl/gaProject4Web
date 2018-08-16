var playerId; 
var gameRoom = window.location.href.split('/')[4];


//Make connection to socket
function serverStart() {
	console.log('connecting...');
	console.log('game room: ' + gameRoom);
	var socket = io.connect('/game/' + gameRoom);

	//setting up 
	socket.on('setup', function(playersPositions, playerid){
		console.log('setting up...');
		// renderBots(bots);
		playerId = playerid;
		renderPlayers(playersPositions);
	});

	//when a player modves
	function sendMove (dir) {
		socket.emit('playerMove', dir, playerId);
		console.log('playerId: ' + playerId);
		console.log('sending Move');
	}

	socket.on('playerMoved', function (playersPositions) {
		console.log('receiving Move');
		renderPlayers(playersPositions);
	})


	//Emit Events


	//receive events 
	// socket.on('changedObj', function (data) {
	// 	sideBarSetup();
	// 	objArr = data.drawings;
	// })

	let returnObj = {
		sendMove : sendMove
	}

	return returnObj;
}
