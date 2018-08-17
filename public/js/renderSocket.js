// function renderBots (bots) {
// 	//remove bots
// 	let currentBots = document.getElementsByClassName('botBox');
// 	let numCurrentBots = currentBots.length;
// 	for(let i=0; i<numCurrentBots; i++) { //iterating through bot boxes
// 		//removing the bot nodes from this
// 		let botNodes = currentBots[i].childNodes;
// 		let numBotNodes = botNodes.length;
// 		for(let a=0; a<numBotNodes; a++) {
// 			if(botNodes[a].classList[0] == 'bot') {
// 				botNodes[a].parentNode.removeChild(botNodes[a]);
// 			}
// 		}
// 		//removing the 'botBox' class from smallBox div
// 		currentBots[i].classList.remove('botBox');
// 	}

// 	//add bots
// 	for (let i=0; i<bots.length; i++) {
// 		let botBox = document.getElementById(bots[i]);
		
// 		var bot = document.createElement('div');
// 		bot.classList.add('bot');
// 		bot.id = botName;
		
// 		botBox.appendChild(bot);
// 		botBox.classList.add("botBox");
// 	}
// }


function renderPlayers (playerPositions) {
	console.log('Removing players');
	//remove all players
	let playersOnMap = document.getElementsByClassName('playerBox');
	console.log('playersOnMap: ' + playersOnMap)
	let numPlayersOnMap = playersOnMap.length;
	for (let i=0; i<numPlayersOnMap; i++) { //iterate through the playerBoxes on the map
		if (playersOnMap[i] === undefined) {
			debugger;
		}
		let player = playersOnMap[i].childNodes;
		for(let a=0; a<player.length; a++) { //find the child node of the playerBox that is the player
			if (player[a].id.split(':')[0] == 'player') {
				//remove the player from the node
				playersOnMap[i].removeChild(player[a]); 
				//remove class from the parent node
				playersOnMap[i].classList.remove('playerBox');
			}
		}
	}

	console.log('rendering players');

	//render all players
	for (let i=0; i<playerPositions.length; i++) {
		let currPosition = playerPositions[i].position;
		let direction = playerPositions[i].direction;
		let id = playerPositions[i].id;

		let player = document.createElement('div');
		player.id = 'player:' + id.toString();
		var playerBox = document.getElementById(currPosition.toString());
		playerBox.appendChild(player);
		playerBox.classList.add('playerBox');
		//rotating the player image
		changeImageDir('player', direction, player);
	}
}