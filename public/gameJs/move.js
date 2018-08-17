var container = document.getElementsByClassName('container');
//for the right side of the page
var right = document.getElementsByClassName('right');
var nameBox = document.getElementsByClassName('name');
var health = document.getElementsByClassName('hp')[0];
var weaponsStats = document.getElementsByClassName('weapons')[0];
var botsLeft = document.getElementsByClassName('botsLeft')[0];
var controls = document.getElementsByClassName('controls')[0];
//general
var name;
var num = 30;
var player;
var playerWeapon = 'pistol';
var direction = 'left';
var hp = 1000;
var checkPause = false;

function changeImageDir(entity, dir, node) {
    if(entity == 'player') {
        var playerBox = player.parentNode;
        if (dir == 'up') {
            playerBox.style.transform = "rotate(0deg)";
        } else if (dir == 'down') {
            playerBox.style.transform = "rotate(180deg)";
        } else if (dir == 'left') {
            playerBox.style.transform = "rotate(270deg)";
        } else if (dir == 'right') {
            playerBox.style.transform = "rotate(90deg)";
        }
    } else if (entity == 'bullet') {
        var bulletBox = node.parentNode;
        if(dir == 'right' || dir == 'left') {
            bulletBox.style.transform = "rotate(90deg)";
        } else if (dir == 'diaL') {
            bulletBox.style.transform = "rotate(135deg)";
        } else if (dir == 'diaR') {
            bulletBox.style.transform = "rotate(45deg)";
        } else {
            bulletBox.style.transform = 'rotate(0deg)';
        }
    }
    
}



//move Up
function moveUp () {
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    var newBox = document.getElementById((playerId - num).toString())

    if(playerId > num && newBox.childNodes.length<1) {
        changeImageDir('player', 'up');
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');

        //find box above
        newBox.classList.add('playerBox');
        newBox.appendChild(player);

        changeImageDir('player', 'up')
        //change direction
        direction = 'up';
    }
}

//move Down
function moveDown () {
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    var newBox = document.getElementById((playerId + num).toString())

    if(playerId <= (num*num)-num && newBox.childNodes.length<1) {
        changeImageDir('player', 'up');
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');

        newBox.classList.add('playerBox');
        newBox.appendChild(player);

        changeImageDir('player', 'down');
        //change direction
        direction = 'down';
    }
}

//move Left
function moveLeft () {
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    var newBox = document.getElementById((playerId - 1).toString())

    if((playerId-1)%num != 0 && newBox.childNodes.length<1) {
        changeImageDir('player', 'up');
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');

        newBox.classList.add('playerBox');
        newBox.appendChild(player);

        changeImageDir('player', 'left');
        //change direction
        direction = 'left';
    }
}

//move Right
function moveRight () {
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    var newBox = document.getElementById((playerId + 1).toString())

    if(playerId%num != 0 && newBox.childNodes.length<1) {
        changeImageDir('player', 'up');
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');

        newBox.classList.add('playerBox');
        newBox.appendChild(player);

        changeImageDir('player', 'right');
        
        direction = 'right';
    }
}

var playerBoxPause;
//pause function
function pause () {
    if(checkPause) {
        //make bots move
        botCheckInt = setInterval(botCheck, 500);
        //re-introduce player
        playerBoxPause.appendChild(player);
        playerBoxPause.classList.add('playerBox');
        //delete text for pause
        var text = document.getElementsByClassName('text')[0].childNodes[0];
        text.style.color = 'white';

        checkPause = false;
    } else {
        //make bots stop
        clearInterval(botCheckInt);
        //get rid of player
        var playerBox = player.parentNode;
        playerBoxPause = player.parentNode;
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');
        //create text for pause
        var text = document.getElementsByClassName('text')[0].childNodes[0];
        text.style.color = 'black';
        text.innerText = "PAUSED, press 'p' to continue";

        checkPause = true;
    }
}

function move (event) {
    // console.log( "current element", event.keyCode)
    if (event.keyCode == "38") {
        //up button
        moveUp();
    } else if (event.keyCode == "40") {
        //down button
        moveDown();
    } else if (event.keyCode == "37") {
        //left button
        moveLeft();
    } else if (event.keyCode == "39") {
        //right button
        moveRight();
    } else if  (event.keyCode == "32") {
        //space bar 
        //in weapons
        fire();
    } else if  (event.keyCode == "49" ||
                event.keyCode == "50" ||
                event.keyCode == "51" ||
                event.keyCode == "52" ||
                event.keyCode == "53") {
        //keys 1,2,3,4,5
        changeWeapons(event.keyCode);

    } else if (event.keyCode == "19" || event.keyCode == "80" || event.keyCode == "27") {
        //pause or p or esc button
        pause();
    }
}