var games  = [];
var bots = [];
var players = [];
var playerIds = 0;
var previousPlay;
var counter = 0;
var target;
var botsWanted = 30;
var num = 30;
var radius = 15;

class Game {
	constructor () {
		this.players = [];
		this.bots = [];
		this.playerIds = 0;
		this.botsWanted = 30;
		this.radius = 15;
	}


}

class Player {
	constructor (position) {
		this.prevPosition;
		this.currPosition = position;
		this.hp = 1000;
		this.id = playerIds;
		playerIds ++;
	}

	updateCurrPosition (currentPosition) {
		this.currPosition = currentPosition;
	}
}
class Bot {
	constructor () {
		this.position;
		this.hp;
	}

	checkNMove() {
		let tempArr = this.playerToAim();
		let shortestDist = tempArr[0];
		let shortestPlayer = tempArr[1];

		if (this.hp <= 0) { 
			//kill the bot if hp is too low
			this.destroy();
		} else if (shortestDist <= 1) { 
			//harm the player
			this.botHarm(shortestPlayer);
		} else if (shortestDist <= radius) { 
			//follow player
			let target;
			if (shortestPlayer.prevPosition != null) {
				target = shortestPlayer.prevPosition;
			} else {
				target = shortestPlayer.currPosition;
			}
			this.botFollow(target);
		} else { 
			//move randomly
			this.botRandom();
		}
	}

	distanceFromPlayer (player) {
		let up = 0;
		let down = 0;
		let right = 0;
		let left = 0;
		let newCurrent = this.position;
		let defaultCurrent = this.position;
		let directions = traceBotToPlayer(this.position, player.currPosition, up, down,  left, right);
		
		let height = directions[0] + directions[1];
		let width = directions[2] + directions[3];

		return(Math.sqrt((height * height) + (width * width)));
	}

	playerToAim() {
		let shortestDist = 1000;
		let shortestPlayer;

		for(let i=0; i<players.length; i++) {
			let distance = this.distanceFromPlayer(players[i]);
			if(distance < shortestDist) {
				shortestPlayer = players[i];
				shortestDist = distance;
			}
		}

		return [shortestDist, shortestPlayer];
	}

	botHarm(player) {
		//damage player
		player.hp -= 100;
		//display hit
		// let timeoutText;
		// var timeoutTextNew;
		// var timeoutTextNewer;
		// var checkTimeout;
		// var text;
		// let textColour = 'red';


		// if(text == 'HIT!' && timeoutText != 'reHit') {
		// 	checkTimeout = 'reHit';
		// 	textColour = 'white';
		// 	clearTimeout(timeoutText);

		// 	timeoutTextNew = setTimeout(function() {
		// 		text.style.color = 'red';
		// 	}, 1000);
		// 	timeoutTextNewer = setTimeout(function() {
		// 		text.style.color = 'white';
		// 		checkTimeout = '';
		// 	}, 2000);
		// } else if (text.innerText == 'HIT!' && timeoutText == 'reHit') {
		// 	text.style.color = 'white';
		// 	clearTimeout(timeoutText);
		// 	clearTimeout(timeoutTextNew);
		// 	clearTimeout(timeoutTextNewer);

		// 	timeoutTextNew = setTimeout(function() {
		// 		text.style.color = 'red';
		// 	}, 1000);
		// 	timeoutTextNewer = setTimeout(function() {
		// 		text.style.color = 'white';
		// 		checkTimeout = '';
		// 	}, 2000);
		// } else {
		// 	text.innerText = 'HIT!';
		// 	timeoutText = setTimeout(function() {
		// 		text.style.color = 'white';
		// 	}, 1000);
		// }
	}

	botFollow(playPosition) {
		if(playPosition > botPosition) {
			if (botPosition < Math.floor(playPosition/num)+checkNumCol(playPosition)) {
				//same row, player is to the right of the bot
				this.botMove('add', 1);
			} else {
				//player is below bot
				if((playPosition-botPosition)%num == 0) {
					//player is vertically below bot
					this.botMove('add', num);
				} else if (checkEntityCol(playPosition) > checkEntityCol(botPosition)) {
					//player is diagonally right below bot --> \ diagonally right
					this.botMove('add', num+1);
				} else if (checkEntityCol(playPosition) < checkEntityCol(botPosition)) {
					//player is diagonally left below bot --> \ diagonally left
					this.botMove('add', num-1);
				}
			}
		} else if (playPosition < botPosition) {
			if (playPosition < Math.floor(botPosition/num)+checkNumCol(botPosition)) {
				//same row, player is to the left of the bot
				this.botMove('minus', 1);
			} else {
				//player is above bot
				if((botPosition-playPosition)%num ==0) {
					//player is vertically above bot
					this.botMove('minus', num);
				} else if (checkEntityCol(playPosition) > checkEntityCol(botPosition)) {
					//player is diagonally left above bot --> / diagonally left
					this.botMove('minus', num-1);
				} else if (checkEntityCol(playPosition) < checkEntityCol(botPosition)) {
					//player is diagonally right above bot --> \ diagonally right
					this.botMove('minus',  num+1);
				}
			}
		}
	}

	botRandom() {
		let dir;

		if (this.position == 0) { //bot is in top left corner
			dir = Math.floor(Math.random()*3)+1;

			if (dir == 1) {
				dir =  4;
			} else if (dir == 2) {
				dir = 2;
			} else {
				dir = 8;
			} 
		} else if (this.position == num) { //bot is in top right corner
			dir = Math.floor(Math.random()*8)+1;
			if (dir == 1) {
				dir =  2;
			} else if (dir == 3) {
				dir = 4;
			} else if (dir == 5 || dir == 8 || dir == 7) {
				dir = 6;
			} 
		} else if (this.position <= num) { //bot is in top row
			dir = Math.floor(Math.random()*8)+2;
			if(dir == 5) {
				dir = 6;
			} else if (dir == 7) {
				dir = 8;
			}
		} else if (this.position == num*num) { //bot is in bottom right corner
			dir = Math.floor(Math.random()*8)+1;
			if (dir == 2) {
				dir =  1;
			} else if (dir == 4) {
				dir = 3;
			} else if (dir == 6 || dir == 8 || dir == 7) {
				dir = 5;
			} 
		} else if (this.position == num*num-num+1) { //bot is in bottom left corner
			dir = Math.floor(Math.random()*8)+1;
			if (dir == 2) {
				dir =  1;
			} else if (dir == 3) {
				dir = 4;
			} else if (dir == 6 || dir == 8 || dir == 7) {
				dir = 5;
			} 
		} else if (this.position > (num*num)-num) { //bot is in bottom row
			dir = Math.floor(Math.random()*8)+1;
			if(dir == 2) {
				dir = 1;
			} else if (dir == 6) {
				dir = 5;
			} else if (dir == 8) {
				dir = 7;
			}
		} else if (this.position%num == 0) { //bot is in right row
			dir = Math.floor(Math.random()*8)+1;
			if(dir == 4) {
				dir = 3;
			} else if (dir == 5) {
				dir = 7;
			} else if (dir == 6)  {
				dir = 8;
			}
		} else if ((this.position-1)%num == 0) { //bot is in left row
			dir = Math.floor(Math.random()*8)+1;
			if(dir == 3) {
				dir = 4;
			} else if (dir == 7) {
				dir = 5;
			} else if (dir == 6) {
				dir = 8;
			}
		} else { //bot is not touching the edges of the bigBox
			dir = Math.floor(Math.random()*8)+1;
		}

		if (dir == 1) {
			//if 1, bot goes up
			this.botMove('minus', num);
		} else if (dir == 2) {
			//if 2, bot goes down
			this.botMove('add', num);
		} else if (dir == 3) {
			//if 3, bot goes left
			this.botMove('minus', 1);
		} else if (dir == 4) {
			//if 4, bot goes right
			this.botMove('add', 1);
		} else if (dir == 5) {
			//if 5, bot goes diaR up
			this.botMove('minus', num-1);
		} else if (dir == 6) {
			//if 6, bot goes diaR down
			this.botMove('add', num-1);
		} else if (dir == 7) {
			//if 7, bot goes diaL up
			this.botMove('minus', num+1);
		} else if (dir == 8) {
			//if 8, bot goes diaL down
			this.botMove('add', num+1);
		}
	}

	botMove(dir, nMove) {
		if(dir == 'add') {
			let targetBox = this.position + nMove;
			if(checkGotPeople(targetBox)) {
				this.position = targetBox;
			}
		} else if (dir == 'minus') {
			let targetBox = this.position - nMove;
			if(checkGotPeople(targetBox)) {
				this.position = targetBox;
			}
		}
	}



}

// =========================================================
// *********************************************************
// 						MISC FUNCTIONS
// *********************************************************
// =========================================================
function checkGotPeople(boxNum) {
	let check = true;
	for(let bot in bots) { //check if bots are in box
		if (bots[bot][1] == boxNum) {
			check = false;
		}
	}
	for(let player in players) { //check if players are in box
		if (players[player][1]) {
			check = false;
		}
	}
	return check;
}

//returns the column number of the object
function checkEntityCol (entity) {
    if (entity%num == 0) {
        return num;
    } else {
        return entity%num;
    }
}

// =========================================================
// *********************************************************
// 						RETRACE STEPS
// *********************************************************
// =========================================================
//returns 1 if not the num column
function checkNumCol (entity) {
    if(entity%num == 0) {
        return 0;
    } else {
        return 1;
    }
}

function botTrace (direct, botPosition, playPosition, up, down, left, right) {
    if (direct == "up") {
        botPosition -= num;
    } else if (direct == 'down') {
        botPosition += num;
    } else if (direct == 'left') {
        botPosition --;
    } else if (direct == 'right') {
        botPosition ++;
    }

    return traceBotToPlayer(botPosition, playPosition, up, down, left, right);
}

function traceBotToPlayer (botPosition, playPosition, up, down, left, right) {
    if(playPosition > botPosition) {
        if (botPosition <= (Math.floor(playPosition/num)+checkNumCol(playPosition))*num) {
            //same row, bot is to the left of the player
            left ++;
            return botTrace('right', botPosition, playPosition, up, down, left, right);
        } else { //bot is above player
            up ++;
            return botTrace('down', botPosition, playPosition, up, down, left, right);
        }
    } else if (playPosition < botPosition)  {
        if (playPosition <= (Math.floor(botPosition/num)+checkNumCol(botPosition))*num) {
            //same row, bot is to the right of the player
            right ++;
            return botTrace('left', botPosition, playPosition, up, down, left, right);
        } else { //bot is below player
            down ++;
            return botTrace('up', botPosition, playPosition, up, down, left, right);
        }
    } else if (botPosition == playPosition) {
        return [up, down, left, right];
    }
}

// =========================================================
// *********************************************************
// 						CONTROLS 
// *********************************************************
// =========================================================

function getBots () { //return array of bot objects
	return bots;
}

function getPlayers () { //return array of player objects
	return players;
}

function botCheck () { //return array of bot positions
	let length = bots.length;
	let botsPosition = []
	for(let i=0; i<bots.length; i++) {
		botsPosition.push(bots[i].position);
	}
	return botsPosition;
}

function playerCheck () { //return array of players positions
	let length = players.length;
	let playersPosition = [];
	for(let i=0; i<length; i++) {
		playersPosition.push(players[i].currPosition);
	}
	console.log('players: ', players);
	console.log(playersPosition);
	return playersPosition;
}

function botCheckNMove () { //move bots and return bot positions
	let length = bots.length;
	let botsPosition = []
	for(let i=0; i<bots.length; i++) {
		bots[i].checkNMove();
		botsPosition.push(bots[i].position);
	}
	return botPosition;
}

function prepForNextRound() {
	let length = bots.length;
	for(let i=0; i<length; i++) {
		players[i].prevPosition = currPosition;
	}
}


function createBot (i) {
	let x = (Math.floor(Math.random() * 3) + 1)
    let y;
    if(x  ==  1) {
        y = '541';
    } else if (x == 2) {
        y = '1278';
    } else if (x == 3) {
        y = '18';
	}
	
	//adding bot to object
	// bots['bot'+i.toString()] = [1000, y];
	bots.push(new Bot(y));
}

function createPlayer (position) {
	let newPlayer = new Player(position);
	players.push(newPlayer);
	return newPlayer;
}

function onBotMove(callback){
	this.moveCallback = callback;
}

function createBotsControl () {
	//create the bots
	var i = 0;
	var x = setInterval(function() {
		
		//socket.emit
		this.moveCallback(i)
		createBot(i);

		i += 1;

		if (i >= botsWanted) {
			clearInterval(x);
		};
	},500);
	//move bots every 0.5 sec
	// var botCheckInt = setInterval(sendBots, 500);
}

// function createGame(){
// 	let player = createPlayer(playerPos); //get new player
// 	this.bots = botCheck(); //get bot positions
// 	this.players = playerCheck(); //get player positions

// 	if(this.players.length == 1) {
// 		createBotsControl();
// 	}

// 	return [this.bots, this.player.id, this.players];
// }


function createGame () {
	let game = new Game ();
	
}


module.exports = {
	createGame : createGame,
	createBotsControl: createBotsControl,
	createPlayer: createPlayer,
	playerCheck: playerCheck,
	prepForNextRound: prepForNextRound,
	botCheck: botCheck
}
















































// function botsLeftNumber () {
//     var botsNum = 0;
//     var values = Object.values(bots);
//     console.log('values: ' + values);
//     for(var i=0; i<values; i++) {
//         if(values[i] > 0) {
//             console.log('values' + i +': ' + values[i]);
//             console.log(botsNum);
//             botsNum++;
//         }
//     }

//     return botsNum;
// }




// function botMove(dir, nMove, bot) {
// 	if(dir == 'add') {
// 		let targetBox = bots[bot][1] + nMove;
// 		if(checkGotPeople(targetBox)) {
// 			bots[bot][1] = targetBox;
// 		}
// 	} else if (dir == 'minus') {
// 		let targetBox = bots[bot][1] - nMove;
// 		if(checkGotPeople(targetBox)) {
// 			bots[bot][1] = targetBox;
// 		}
// 	}
// }


// //returns the column number of the object
// function checkEntityCol (entity) {
//     if (entity%num == 0) {
//         return num;
//     } else {
//         return entity%num;
//     }
// }

// //returns 1 if not the num column
// function checkNumCol (entity) {
//     if(entity%num == 0) {
//         return 0;
//     } else {
//         return 1;
//     }
// }

// //check if the bot is beside the player
// function checkBeside (play, bot) {
//     if(play-bot == 1) {
//         return true;
//     } else if (bot-play == 1) {
//         return true;
//     } else if (bot-play == num) {
//         return true;
//     } else if (play-bot == num) {
//         return true;
//     } else {
//         return false;
//     }
// }

// //check if the bot is diagonal to the player
// function checkDiagonal (play, bot) {
//     if(play-bot == num+1) {
//         return true;
//     } else if (play-bot == num-1) {
//         return true;
//     } else if (bot-play == num+1) {
//         return true;
//     } else if (bot-play == num-1) {
//         return true;
//     } else {
//         return false;
//     }
// }



// // =========================================================
// // *********************************************************
// // 						RETRACE STEPS
// // *********************************************************
// // =========================================================


// function currentMove (direct, previous, current, up, down, left, right, newCurrent, defaultCurrent) {
//     // console.log("initial current: " + current);
//     // console.log("previous: " + previous);
    
//     if (direct == "up") {
//         current -= num;
//     } else if (direct == 'down') {
//         current += num;
//     } else if (direct == 'left') {
//         current --;
//     } else if (direct == 'right') {
//         current ++;
//     }

//     // console.log("new current: " + current);
//     // debugger;
//     determine(previous, current, up, down, left, right, newCurrent, defaultCurrent);
// }

// function determine (previous, current, up, down, left, right, newCurrent, defaultCurrent) {
//     //console.log('ccc', counter)
//     if(current > previous) {
//         counter++;
//         if (current <= (Math.floor(previous/num)+checkNumCol(previous))*num) {
//             //same row, current is to the right of the previous
//             right ++;
//             currentMove('left', previous, current, up, down, left, right, newCurrent, defaultCurrent);
//         } else {
//             down ++;
//             currentMove('up', previous, current, up, down, left, right, newCurrent, defaultCurrent);
//         }
//     } else if (current < previous)  {
//         if (previous <= (Math.floor(current/num)+checkNumCol(current))*num) {
//             //same row, current is to the left of the previous
//             left ++;
//             currentMove('right', previous, current, up, down, left, right, newCurrent, defaultCurrent);
//         } else {
//             up ++;
//             currentMove('down', previous, current, up, down, left, right, newCurrent, defaultCurrent);
//         }
//     } else if (current == previous) {
//         for(var i=0; i<3; i++) {
//             if(down != 0 || up != 0) {
//                 newCurrent = newCurrent + (down*num) - (up*num);
//                 down = 0;
//                 up = 0;
//             } else if (right != 0) {
//                 if (newCurrent%num != 0) {
//                     newCurrent = newCurrent + right;
//                     right = 0;
//                 }
//             } else if (left != 0) {
//                 if ((newCurrent-1)%num != 0) {
//                     newCurrent = newCurrent + left;
//                     left = 0;
//                 }
//             }
//         } 
        
//         if (newCurrent < 0 || newCurrent > num*num) {
//             target = defaultCurrent;
//         } else {
//             target = newCurrent;
//         }
//     }
// }

// //predict where the bot is going
// function predictPlay (previous, current) {
//     var up = 0;
//     var down = 0;
//     var right = 0;
//     var left = 0;
//     var newCurrent = current;
//     var defaultCurrent = current;
//     determine(previous, current, up, down,  left, right, newCurrent, defaultCurrent);
// }




// function moveRandom (playPosition, botPosition, bot) {
//     if(checkBeside(playPosition, botPosition)) {
//         //bot is directly beside the player, damages the player at each interval
//         hp -= 100;
//     } else {
//         var dir;

//         if (botPosition == 0) { //bot is in top left corner
//             dir = Math.floor(Math.random()*3)+1;

//             if (dir == 1) {
//                 dir =  4;
//             } else if (dir == 2) {
//                 dir = 2;
//             } else {
//                 dir = 8;
//             } 
//         } else if (botPosition == num) { //bot is in top right corner
//             dir = Math.floor(Math.random()*8)+1;
//             if (dir == 1) {
//                 dir =  2;
//             } else if (dir == 3) {
//                 dir = 4;
//             } else if (dir == 5 || dir == 8 || dir == 7) {
//                 dir = 6;
//             } 
//         } else if (botPosition <= num) { //bot is in top row
//             dir = Math.floor(Math.random()*8)+2;
//             if(dir == 5) {
//                 dir = 6;
//             } else if (dir == 7) {
//                 dir = 8;
//             }
//         } else if (botPosition == num*num) { //bot is in bottom right corner
//             dir = Math.floor(Math.random()*8)+1;
//             if (dir == 2) {
//                 dir =  1;
//             } else if (dir == 4) {
//                 dir = 3;
//             } else if (dir == 6 || dir == 8 || dir == 7) {
//                 dir = 5;
//             } 
//         } else if (botPosition == num*num-num+1) { //bot is in bottom left corner
//             dir = Math.floor(Math.random()*8)+1;
//             if (dir == 2) {
//                 dir =  1;
//             } else if (dir == 3) {
//                 dir = 4;
//             } else if (dir == 6 || dir == 8 || dir == 7) {
//                 dir = 5;
//             } 
//         } else if (botPosition > (num*num)-num) { //bot is in bottom row
//             dir = Math.floor(Math.random()*8)+1;
//             if(dir == 2) {
//                 dir = 1;
//             } else if (dir == 6) {
//                 dir = 5;
//             } else if (dir == 8) {
//                 dir = 7;
//             }
//         } else if (botPosition%num == 0) { //bot is in right row
//             dir = Math.floor(Math.random()*8)+1;
//             if(dir == 4) {
//                 dir = 3;
//             } else if (dir == 5) {
//                 dir = 7;
//             } else if (dir == 6)  {
//                 dir = 8;
//             }
//         } else if ((botPosition-1)%num == 0) { //bot is in left row
//             dir = Math.floor(Math.random()*8)+1;
//             if(dir == 3) {
//                 dir = 4;
//             } else if (dir == 7) {
//                 dir = 5;
//             } else if (dir == 6) {
//                 dir = 8;
//             }
//         } else { //bot is not touching the edges of the bigBox
//             dir = Math.floor(Math.random()*8)+1;
//         }

//         if (dir == 1) {
//             //if 1, bot goes up
//             botMove('minus', num, getBots[i]);
//         } else if (dir == 2) {
//             //if 2, bot goes down
//             botMove('add', num, getBots[i]);
//         } else if (dir == 3) {
//             //if 3, bot goes left
//             botMove('minus', 1, getBots[i]);
//         } else if (dir == 4) {
//             //if 4, bot goes right
//             botMove('add', 1, getBots[i]);
//         } else if (dir == 5) {
//             //if 5, bot goes diaR up
//             botMove('minus', num-1, getBots[i]);
//         } else if (dir == 6) {
//             //if 6, bot goes diaR down
//             botMove('add', num-1, getBots[i]);
//         } else if (dir == 7) {
//             //if 7, bot goes diaL up
//             botMove('minus', num+1, getBots[i]);
//         } else if (dir == 8) {
//             //if 8, bot goes diaL down
//             botMove('add', num+1, getBots[i]);
//         }
        
//     }
// }





// var timeoutText;
// var timeoutTextNew;
// var timeoutTextNewer;
// var checkTimeout;
// //for the bots to follow the player
// function moveFollowEasy (playPosition, target, botPosition, bot, player) {
//     if(checkBeside(playPosition, botPosition) || checkDiagonal(playPosition, botPosition)) {
//         if(bots[bot][0]>0) {
//             //bot is directly beside the player, damages the player at each interval
//             players[player] -= 100;
            
// 			//display hit
// 			var text = document.getElementsByClassName('text')[0].childNodes[0];
// 			text.style.color = 'red';

// 			if(text.innerText == 'HIT!' && timeoutText != 'reHit') {
// 				checkTimeout = 'reHit';
// 				text.style.color = 'white';
// 				clearTimeout(timeoutText);

// 				timeoutTextNew = setTimeout(function() {
// 					text.style.color = 'red';
// 				}, 1000);
// 				timeoutTextNewer = setTimeout(function() {
// 					text.style.color = 'white';
// 					checkTimeout = '';
// 				}, 2000);
// 			} else if (text.innerText == 'HIT!' && timeoutText == 'reHit') {
// 				text.style.color = 'white';
// 				clearTimeout(timeoutText);
// 				clearTimeout(timeoutTextNew);
// 				clearTimeout(timeoutTextNewer);

// 				timeoutTextNew = setTimeout(function() {
// 					text.style.color = 'red';
// 				}, 1000);
// 				timeoutTextNewer = setTimeout(function() {
// 					text.style.color = 'white';
// 					checkTimeout = '';
// 				}, 2000);
// 			} else {
// 				text.innerText = 'HIT!';
// 				timeoutText = setTimeout(function() {
// 					text.style.color = 'white';
// 				}, 1000);
// 			}
//         }
//     } else if(target > botPosition) {
//         if (target < Math.floor(botPosition/num)+checkNumCol(botPosition)) {
//             //same row, player is to the right of the bot
//             botMove('add', 1, bot);
//         } else {
//             //player is below bot
//             if((target-botPosition)%num ==0) {
//                 //player is vertically below bot
//                 botMove('add', num, getBots[i]);
//             } else if (checkEntityCol(target) > checkEntityCol(botPosition)) {
//                 //player is diagonally right below bot --> \ diagonally right
//                 botMove('add', num+1, getBots[i]);
//             } else if (checkEntityCol(target) < checkEntityCol(botPosition)) {
//                 //player is diagonally left below bot --> \ diagonally left
//                 botMove('add', num-1, getBots[i]);
//             }
//         }

//     } else if (target < botPosition) {

//         if (botPosition < Math.floor(target/num)+checkNumCol(target)) {
//             //same row, player is to the left of the bot
//             botMove('minus', 1, getBots[i]);
//         } else {
//             //player is above bot
//             if((botPosition-target)%num ==0) {
//                 //player is vertically above bot
//                 botMove('minus', num, getBots[i]);
//             } else if (checkEntityCol(target) > checkEntityCol(botPosition)) {
//                 //player is diagonally left above bot --> / diagonally left
//                 botMove('minus', num-1, getBots[i]);
//             } else if (checkEntityCol(target) < checkEntityCol(botPosition)) {
//                 //player is diagonally right above bot --> \ diagonally right
//                 botMove('minus',  num+1, getBots[i]);
//             }
//         }
//     }
// }




// //check for bots within a certain radius from the player
// function checkRadius (playPosition, rad) {
//     var idInRadius = [];

//     if (playPosition == 1) {
//         //when the player is in the top left corner of the bigBox
//         for (var i=1; i<=rad; i++) {
//             var diagKey = playPosition+((num+1)*i);

//             for(var a=1; a<=i; a++) {
//                 idInRadius.push((diagKey+(num*a)).toString());
//                 idInRadius.push((diagKey-(1*a)).toString());
//             }
            
//             idInRadius.push(diagKey.toString());
//         }
//     } else if (playPosition == num) {
//         //when the player is in the top right corner of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var diagKey = playPosition + ((num-1)*i);

//             for(var a=1; a<=i; a++) {
//                 idInRadius.push((diagKey-(num*a)).toString());
//                 idInRadius.push((diagKey+(1*a)).toString());
//             }
            
//             idInRadius.push(diagKey.toString());
//         }
//     } else if (playPosition == (num*num)-num+1) {
//         //when the player is in the bottom left corner of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var diagKey = playPosition - ((num-1)*i);

//             for(var a=1; a<=rad; a++) {
//                 idInRadius.push((diagKey-(1*a)).toString());
//                 idInRadius.push((diagKey+(num*a)).toString());
//             }
            
//             idInRadius.push(diagKey.toString());
//         }
//     } else if (playPosition == num*num) {
//         //when the player is in the bottom right corner of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var diagKey = playPosition - ((num+1)*i);

//             for(var a=1; a<=i; a++) {
//                 idInRadius.push((diagKey+(i*a)).toString());
//                 idInRadius.push((diagKey+(num*a)).toString());
//             }

//             idInRadius.push(diagKey.toString());
//         }
//     } else if (playPosition <= num) {
//         //when the player is in the top row of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var bl = playPosition+((num-1)*i);
//             var br = playPosition+((num+1)*i);

//             for (var a=1; a<=i; a++) {
//                 idInRadius.push((bl-(num*a)).toString());
//                 idInRadius.push((br-(num*a)).toString());
//             }

//             for(var a=1; a<=1+((i-1)*2); a++) {
//                 idInRadius.push((bl+(1*a)).toString());
//             }

//             idInRadius.push(bl.toString());
//             idInRadius.push(br.toString());
//         }
//     } else if (playPosition > (num*num)-num) {
//         //when the player is in the bottom row of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var tl = playPosition-((num+1)*i);
//             var tr = playPosition-((num-1)*i);

//             for (var a=1; a<=i; a++) {
//                 idInRadius.push((tr+(num*a)).toString());
//                 idInRadius.push((tl+(num*a)).toString());
//             }

//             for(var a=1; a<=1+((i-1)*2); a++) {
//                 idInRadius.push((tl+(1*a)).toString());
//             }

//             idInRadius.push(tl.toString());
//             idInRadius.push(tr.toString());
//         }
//     } else if (playPosition%num == 0) {
//         //when the player is in the right row of the bigBox
//         for(var i=1; i<=rad; i++) {
//             var tl = playPosition-((num+1)*i);
//             var bl = playPosition+((num-1)*i);

//             for(var a=1; a<=i; a++) {
//                 idInRadius.push((tl+(1*a)).toString());
//                 idInRadius.push((bl+(1*a)).toString());
//             }

//             for(var a=1; a<=1+((i-1)*2); a++) {
//                 idInRadius.push((tl+(num*a)).toString());
//             }

//             idInRadius.push(tl.toString());
//             idInRadius.push(bl.toString());
//         }
//     } else if ((playPosition - 1)%num == 0) {
//         //when the player is in the left row of the bigBox
//         for(var i=0; i<=rad; i++) {
//             var tr = playPosition-((num-1)*i);
//             var br = playPosition+((num+1)*i);

//             for(var a=0; a<=rad; a++) {
//                 idInRadius.push((tr-(1*a)).toString());
//                 idInRadius.push((br-(1*a)).toString());
//             }

//             for(var a=1; a<=1+((i-1)*2); a++) {
//                 idInRadius.push((tr+(num*a)).toString());
//             }

//             idInRadius.push(tr.toString());
//             idInRadius.push(br.toString());
//         }
//     } else {
//         //for when the player is not touching the walls
//         for(var a=1; a<=rad; a++) {
//             //finding the ids of the corners of the divs of distance a from the player
//             var tr = playPosition - (num-1)*a;
//             var tl = playPosition - (num+1)*a;
//             var br = playPosition + (num+1)*a;
//             var bl = playPosition + (num-1)*a;
    
//             //adding the ids of the corners to the array
//             idInRadius.push(tr.toString());
//             idInRadius.push(tl.toString());
//             idInRadius.push(br.toString());
//             idInRadius.push(bl.toString());
    
//             //finding the ids of everything in between the corners
//             for (var b=1; b<= 1+(a-1)*2; b++) {
//                 idInRadius.push((tr + num*b).toString());
//                 idInRadius.push((tl + 1*b).toString());
//                 idInRadius.push((br - 1*b).toString());
//                 idInRadius.push((bl - num*b).toString());
//             }
//         }
//     }
//     // console.log('radius: ' + idInRadius);
//     return idInRadius;
    
//     // debugger;
// }





// function checkBotInRadius (playPosition, currentBotElement) {
//     var checking = false;
//     var idInRadius = checkRadius(playPosition, 15);
    
//     for(var a=0; a < idInRadius.length; a++) {
//         if(idInRadius[a] == currentBotElement) {
//             checking = true;
//         }
//     }
//     return checking;
// }








// //check where the player is relative to the bot and call the botMove function with arguments
// function botCheck () {
// 	// console.log('botCheck', counter);
// 	for(let player in players) {
// 		//get the player's position
// 		playPosition = players[player][1];
// 		previousPlay = players[player][2];

// 		//predict where the player will be based on how much the player has moved
// 		if (previousPlay != null) {
// 			predictPlay(previousPlay, playPosition);
// 		} else {
// 			target = playPosition;
// 		}

// 		//prepping for the next check
// 		if (previousPlay != null) {
// 			players[player][2] = playPosition;
// 		} else {
// 			players[player].push(playPosition);
// 		}

// 		for(var bot in bots) {
// 			//get the bot position
// 			botPosition = bots[bot][1];
// 			botHealth = bots[bot][0];

// 			if(botHealth <= 0) {
// 				//check if hp is <= 0 and delete bot from object if so
// 				delete bots[bot];
// 			}

// 			//if bot is well, check if in radius and determine move pattern
// 			if (checkBotInRadius(playPosition, botPosition)) {
// 				moveFollowEasy(playPosition, target, botPosition, bot, player);
// 			} else {
// 				moveRandom(playPosition, botPosition, bot);
// 			}
// 		}
// 	}
// }