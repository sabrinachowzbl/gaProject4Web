var games  = [];
var num = 30;

//GAME CLASS
class Game { 
	constructor () {
		this.players = [];
		this.bots = [];
		this.playerIds = 0;
	}
}

//PLAYER CLASS
class Player {
	constructor (position, game) {
		this.currPosition = position;
		this.direction = 'up';
		this.hp = 1000;
		this.id = game.playerIds;
		game.playerIds ++;
	}

	updateCurrPosition (currentPosition) {
		this.currPosition = currentPosition;
	}
}

//BULLET CLASS
class Bullet {
	constructor () {

	}
}

// =========================================================
// *********************************************************
// 						CONTROLS 
// *********************************************************
// =========================================================

function createGame () {
	let game = new Game ();
	games.push(game);
	return game;
}

function createPlayer (game) {
	let check = true;
	let playerPos;

	while(check == true) { //to make sure that the player appears in a place that doesn't have anything else in it
		playerPos = (Math.floor(Math.random() * num*num) + 1);
		let playerPositions = game.players;

		let checkCheck = true;
		for (let i=0; i < playerPositions.length; i++) {
			if (playerPos == playerPositions[i].currPosition) {
				checkCheck = false;
			}
		}

		if(checkCheck == true) { //if no boxes with player in it, exit loop
			check = false;
		} 
	}

	let newPlayer = new Player(playerPos, game);
	game.players.push(newPlayer);
	return newPlayer;
}

function playerCheck (game) { //return array of players positions
	let length = game.players.length;
	let playersSituation = [];

	for(let i=0; i < length; i++) {
		let shit = {}
		shit['position'] = game.players[i].currPosition;
		shit['direction'] = game.players[i].direction;
		shit['id'] = game.players[i].id;
		playersSituation.push(shit);
	}

	return playersSituation;
}

function noOneInBox (boxId, game) {
	let players = game.players;

	for (let i=0; i < players.length; i++) {
		if (players[i].currPosition == boxId) {
			return false;
		}
	}

	return true;
}

function movePlayer (game, dir, playerId) {
	let playerMoved;
	let playerPos;
	let players = game.players;

	for (let i=0; i < players.length; i++) { //get the player + the current position of player
		if (players[i].id == playerId) {
			playerMoved = players[i];
			playerPos = players[i].currPosition;
		}
	}

	let target;
	switch (dir) { //check whether can move and move
		case 'up':
			target = playerPos - num;
			if (playerPos > num && noOneInBox(target, game)) {
				playerMoved.currPosition = target;
				playerMoved.direction = 'up';
			}
			break;
		case 'down':
			target = playerPos + num;
			if (playerPos <= (num*num)-num && noOneInBox(target, game)) {
				playerMoved.currPosition = target;
				playerMoved.direction = 'down';
			}
			break;
		case 'left':
			target = playerPos - 1;
			if ((playerPos-1)%num != 0 && noOneInBox(target, game)) {
				playerMoved.currPosition = target;
				playerMoved.direction = 'left';
			}
			break;
		case 'right':
			target = playerPos + 1;
			if (playerPos%num != 0 && noOneInBox(target, game)) {
				playerMoved.currPosition = target;
				playerMoved.direction = 'right';
			}
			break;
	}
}





function gameSituation (game) {

}


module.exports = {
	createGame : createGame,
	createPlayer : createPlayer,
	playerCheck : playerCheck,
	movePlayer : movePlayer,
	gameSituation : gameSituation
}

