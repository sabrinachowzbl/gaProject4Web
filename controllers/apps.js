var gameLogic = require('./bot.js');

module.exports = function (db, io) {
	let socketRooms = {};
	let games = {};
	let playersPosition = {};
	let players = [];

	const gameSocket = (request, response) => {
		let id = request.params.id;
		//Socket Setup
        socketRooms[id] = io.of('/game/' + id);

		socketRooms[id].on('connect', function (socket) {
			console.log('made socket connection', socket.id);
			

			//setup -> send bots and player information
			console.log('setting up...')
			if (games[id] == null) {
				let game = gameLogic.createGame()
				games[id] = game;
				let player = gameLogic.createPlayer(game);

				let playersPosition = gameLogic.playerCheck(game);
				socketRooms[id].emit('setup', playersPosition, player.id);
			} else {
				let player = gameLogic.createPlayer(games[id]);
				
				let playersPosition = gameLogic.playerCheck(games[id]);
				socketRooms[id].emit('setup', playersPosition, player.id);	
			}

			// gameSocketRoom.emit('bots', bots);
			// bulletClock;
			// socketRooms[id].emit('hi', 'Hello!');

			// socket.on('changedObj', function (data) {
			// 	console.log('changed object');
			// 	socketRooms[id].emit('changedObj', data);
			// });

			socket.on('playerMove', function (dir, playerId) {
				//move the players in the game logic
				gameLogic.movePlayer(games[id], dir, playerId);
				
				//send out the current players positions
				let playersPosition = gameLogic.playerCheck(games[id]);
				socket.emit('playerMoved', playersPosition);
			});
			
		});

		// cookies and rendering jsx template
	    response.cookie('gameSocket', id);
	    response.render('game', {username: request.cookies.username, id: id});
	}

    return {
        gameSocket: gameSocket
    }
}