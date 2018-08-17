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
				let player = gameLogic.createPlayer(games[id], socket.id);
				console.log('player Made NEW!')

				let playersPosition = gameLogic.playerCheck(game);
				socketRooms[id].emit('setup', playersPosition, player.id);
			} else if (gameLogic.checkForSocket(socket.id, games[id])) {
				let player = gameLogic.createPlayer(games[id], socket.id);
				
				let playersPosition = gameLogic.playerCheck(games[id]);
				console.log('player Made!')
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
	    response.render('gameSocket', {username: request.cookies.username, id: id});
	}

	const game = (request, response) => { //load html game
		response.render('game', {username: request.cookies.username});
	}

	const postGameStats = (request, response) => { //upload win or loss and redirect to dashboard
		console.log('posting game stats');
		console.log(request.body.winLoss);

		let userId = request.cookies['user_id'];
		let winLoss = request.body.winLoss;
		db.apple.postGameStats(userId, winLoss, (results) => {
			console.log(results);
			response.redirect('/dashboard');
		});
	}

	const getDashboard = (request, response) => {
		// console.log(request.body);

		let userId = request.cookies['user_id'];
		db.apple.getGameStats(userId, (results) => {
			console.log(results);
			let wins = 0;
			let losses = 0;

			for (let i=0; i<results.length; i++) {
				console.log(results[i]);
				switch (results[i].win_loss) {
					case 'win':
						wins++;
						break;
					case 'lost':
						losses++;
						break;
					default:
				}
			}

			let gameUrl = '/game/' + userId.toString();
			response.render('gameDashboard', {wins: wins.toString(), losses: losses.toString(), gameUrl: gameUrl});
		});
	}

    return {
		gameSocket: gameSocket,
		game: game,
		postGameStats: postGameStats,
		getDashboard: getDashboard
    }
}