//record the name
function nameRecord () {
    name = document.getElementById('name').value;
    console.log('name: ' + name);
}

function buildingGrid () {
    bigBox = document.createElement('div');
    bigBox.classList.add('bigBox');

    for (var i = 1; i <= num*num; i++) {
        var smallBox = document.createElement('div');
        smallBox.classList.add('smallBox');
        smallBox.id = i;
        var boxSize = 698 / num;

        smallBox.style.width = boxSize +'px';
        smallBox.style.height = boxSize + 'px'; 
        smallBox.style.display = "inline-block"; 

        bigBox.appendChild(smallBox);
    }

    //deleting everything inside container at the start of the game
    var input = document.getElementById('name');
    var welcome = document.getElementById('welcome');
    var start = document.getElementsByClassName('button');
    var insertName = document.getElementsByClassName('insertName');
    input.parentNode.removeChild(input);
    welcome.parentNode.removeChild(welcome);
    start[0].parentNode.removeChild(start[0]);
    insertName[0].parentNode.removeChild(insertName[0]);

    //building the text above bigBox
    var text = document.createElement('h1');
    text.innerText = " ";
    container[0].appendChild(text);
    container[0].appendChild(bigBox);
}


function createWalls () {
    
}



function addingPlayer () {
    player = document.createElement('div');
    player.id = 'player';
    var playerBox = document.getElementById(num*num/2);
    playerBox.appendChild(player);
    playerBox.classList.add('playerBox');
    //rotating the player image
    playerBox.style.transform = "rotate(270deg)";
}



function buildBottom () {
    //display HP
        //text for HP
        var myHealth = document.createElement('h3');
        myHealth.id = 'hp';
        myHealth.innerText = 'HP: ' + hp + " / 1000"
        health.appendChild(myHealth);

        //creating progress bar
        var myProgress =  document.createElement('div');
        var myBar = document.createElement('div');
        myProgress.id = 'myHealth';
        myBar.id = 'myBar';
        myProgress.appendChild(myBar);
        health.appendChild(myProgress);

    //adding the level to the bottom
    var level = document.getElementById('level');
    level.innerText = 'Level One';
}





function buildRight() {
    //build Name + Stats
    var nameBox = document.getElementsByClassName('name');
    var nameStats = document.createElement('h1');

    if(name != '') {
        nameStats.innerText = name + "'s Stats";
        nameBox[0].appendChild(nameStats);
    } else {
        nameStats.innerText = "anything";
        nameStats.style.color = 'white';
        nameBox[0].appendChild(nameStats);
    }

     //Controls 
     var controlsText = document.createElement('h3');
     var controlDirection = document.createElement('p');
     var controlFire = document.createElement('p');
     var controlWeapons = document.createElement('p');
     var controlPause = document.createElement('p');
 
     controlsText.innerHTML = '<u>Controls:</u> ';
     controlDirection.innerHTML = '- use the <b>up/down/left/right</b> arrows to move the shooter around';
     controlFire.innerHTML = '- press + hold <b>spacebar</b> to shoot';
     controlWeapons.innerHTML = '- <b>key 1</b> for gun, <b>key 2</b> for shotgun, <b>key 3</b> for grenade';
     controlPause.innerHTML = '- <b>p/esc</b> to pause';
 
     controls.appendChild(controlsText);
     controls.appendChild(controlDirection);
     controls.appendChild(controlFire);
     controls.appendChild(controlWeapons);
     controls.appendChild(controlPause);
 
     //Bots Left
    //  var botsLeftText = document.createElement('h3');
    //  botsLeftText.innerText = 'Bots left: ' + botsWanted + ' / ' + botsWanted;
    //  botsLeft.appendChild(botsLeftText);

    //build Weapons
        //text for weapons
        var weaponText = document.createElement('h3');
        weaponText.innerText = 'Weapon Stats: '
        weaponsStats.appendChild(weaponText);

        //weapon stats
        var pistolStats = document.createElement('div');
        var shotgunStats = document.createElement('div');
        var grenadeStats = document.createElement('div');

        pistolStats.classList.add('weaponBoxChosen');
        if (noWeapons[1] != 0) {
            shotgunStats.classList.add('weaponBox');
        } else {
            shotgunStats.classList.add('noWeaponBox');
        }

        if (noWeapons[2] != 0) {
            grenadeStats.classList.add('weaponBox');
        } else {
            grenadeStats.classList.add('noWeaponBox');
        }

        //adding stats to the Pistol divs
        var imgP = document.createElement('div');
        var nameP = document.createElement('div');
        var numberP = document.createElement('div');
        var damageP = document.createElement('div');

        imgP.classList.add('weaponImgPistol');
        nameP.classList.add('weaponName');
        numberP.classList.add('weaponNumber');
        damageP.classList.add('weaponDamagePistol');

        nameP.innerText = 'Pistol';
        numberP.innerHTML = "available: ∞   ";
        damageP.innerText = 'damage: ' + weapons.pistol.damage;        

        pistolStats.appendChild(imgP);
        pistolStats.appendChild(nameP);
        pistolStats.appendChild(numberP);
        pistolStats.appendChild(damageP);

        //adding stats to the Shotgun divs
        var imgS = document.createElement('div');
        var nameS = document.createElement('div');
        var numberS = document.createElement('div');
            numberS.id = 'numberS';
        var damageS = document.createElement('div');

        imgS.classList.add('weaponImgShotgun');
        nameS.classList.add('weaponName');
        numberS.classList.add('weaponNumber');
        damageS.classList.add('weaponDamage');

        nameS.innerText = 'Shotgun';
        numberS.innerText = 'available: ' + noWeapons[1];
        damageS.innerText = 'damage: ' + weapons.shotgun.damage;

        shotgunStats.appendChild(imgS);
        shotgunStats.appendChild(nameS);
        shotgunStats.appendChild(numberS);
        shotgunStats.appendChild(damageS);

        //adding stats to the Grenade divs
        var imgG = document.createElement('div');
        var nameG = document.createElement('div');
        var numberG = document.createElement('div');
            numberG.id = 'numberG';
        var damageG = document.createElement('div');

        imgG.classList.add('weaponImgGrenade');
        nameG.classList.add('weaponName');
        numberG.classList.add('weaponNumber');
        damageG.classList.add('weaponDamage');

        nameG.innerText = 'Grenade';
        numberG.innerText = 'available: ' + noWeapons[2]
        damageG.innerText = 'damage: ' + weapons.grenade.damage;

        grenadeStats.appendChild(imgG);
        grenadeStats.appendChild(nameG);
        grenadeStats.appendChild(numberG);
        grenadeStats.appendChild(damageG);
        

        weaponsStats.appendChild(pistolStats);
        weaponsStats.appendChild(shotgunStats);
        weaponsStats.appendChild(grenadeStats);
}



var socketFunctions;
function setup () {
    nameRecord();

    //build the grid and remove the stuff inside
	buildingGrid();
	
	//connect to server, get bots and player positions
	console.log('starting server');
	socketFunctions = serverStart();

    //creating walls
    createWalls();

    //adding player to grid 
    // addingPlayer();

    //listen for keydown strokes
    document.addEventListener('keydown', move);

    //getting zombies --> in bot.js
    // levelOne();

    //checking for Win Loss Situation --> in check.js
    var int = setInterval(function () {checkWinLoss(int)}, 500);

    //building the hp bar and level at the bottom
    buildBottom();

    //build right side DOM
    buildRight();

    //pause
    // pause();
}


function everything () {
    var start = document.getElementsByClassName('button');
    start[0].addEventListener('click', setup);
    console.log('start');
}

window.onload = everything();

