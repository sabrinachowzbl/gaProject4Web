//check identity of div
function checkIdentity (entity) {
    if (entity.id == 'player') {
        return 'player';
    }

    for(var i=0; i<entity.classList; i++) {
        if (entity.classList[i] == 'bot') {
            return 'bot';
        }
    }
}

//subsequent movement of a bullet
function bulletCheckMove (dir, bullet, int)  {
    var bulletBox = bullet.parentNode;
    if( bulletBox === null ){
        debugger;
    }
    var bulletId = parseInt(bulletBox.id);

    if (bulletBox.childNodes.length > 1) {
        //check for enemy or player or wall
        var playerCheck = bulletBox.querySelector('#player');
        var botCheck = bulletBox.querySelector('.bot');

        if(playerCheck != null) {
            hp = hp - weapons.pistol.damage;

            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
            return;
        } else if (botCheck != null) {
            //damage to bot
            var botId = botCheck.id;
            bots[botId] = bots[botId] - weapons.pistol.damage;

            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
            return;
        }else{
            debugger;
        }
    }
    
    if (dir == 'left') {
        if((bulletId - 1)%num != 0) {
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId - 1).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'left', bullet);
        } else {
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'right') {
        if(bulletId%num != 0) {
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId + 1).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'right', bullet);
        } else {
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'up') {
        if(bulletId > num) {
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId - num).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'up', bullet);
        } else {
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir ==  'down') {
        if(bulletId <= (num*num)-num) {
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId + num).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'down', bullet);
        } else {
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'diaRUp') {
        if(bulletId > num && bulletId%num != 0) { //check if bullet is not in top or right row
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId - (num-1)).toString());
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'diaR', bullet);
        } else {
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'diaRDown') {
        if(bulletId <= num*num-num && (bulletId-1)%num != 0) { //check if bullet is not in bottom or left row
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId + (num-1)).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'diaR', bullet);
        } else {
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'diaLUp') {
        if(bulletId > num && (bulletId-1)%num != 0) { //check if bullet is not in top or left row
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId - (num+1)).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'diaL', bullet);
        } else {
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else if (dir == 'diaLDown') {
        if(bulletId <= num*num-num && bulletId%num != 0) { //check if bullet is not in bottom or right row
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box 
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');

            //add to new box
            var newBox = document.getElementById((bulletId + (num+1)).toString())
            newBox.appendChild(bullet);
            newBox.classList.add('bulletBox');
            changeImageDir('bullet', 'diaL', bullet);
        } else {
            //fixing the box
            changeImageDir('bullet', 'up', bullet);
            //remove from old box
            bulletBox.removeChild(bullet);
            bulletBox.classList.remove('bulletBox');
            clearInterval(int);
        }
    } else {
        //remove from old box
        bulletBox.removeChild(bullet);
        bulletBox.classList.remove('bulletBox');
        clearInterval(int);
    }

}



function firePistol () {
    //fire pistol
    var bullet = document.createElement('div');
    bullet.classList.add('bullet');
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    
    if (direction == 'left') {
        if((playerId - 1)%num != 0) {
            var bulletBox = document.getElementById((playerId - 1).toString())
            bulletBox.appendChild(bullet);
            bulletBox.classList.add('bulletBox');
            changeImageDir('bullet', 'left', bullet);
            var int = setInterval(function () {bulletCheckMove('left', bullet, int)}, 20);
        }
    } else if (direction == 'right') {
        if(playerId%num != 0) {
            var bulletBox = document.getElementById((playerId+1).toString())
            bulletBox.appendChild(bullet);
            bulletBox.classList.add('bulletBox');
            changeImageDir('bullet', 'right', bullet);
            var int = setInterval(function () {bulletCheckMove('right', bullet, int)}, 20);
        }
    } else if (direction == 'up') {
        if(playerId > num) {
            var bulletBox = document.getElementById((playerId-num).toString())
            bulletBox.appendChild(bullet);
            bulletBox.classList.add('bulletBox');
            changeImageDir('bullet', 'up', bullet);
            var int = setInterval(function() {bulletCheckMove('up', bullet, int)}, 20);
        }
    } else if (direction == 'down') {
        if(playerId <= (num*num)-num) {
            var bulletBox = document.getElementById((playerId+num).toString())
            bulletBox.appendChild(bullet);
            bulletBox.classList.add('bulletBox');
            changeImageDir('bullet', 'up', bullet);
            var int = setInterval(function () {bulletCheckMove('down', bullet, int)}, 20);
        }
    }
}


var topDia = true; //on the left of middle bullet
var bottomDia = true; //on the right of middle bullet
//check if can shoot top or bottom diagonal
function checkCanShoot () {
var playerBox = player.parentNode;
var playerId = parseInt(playerBox.id);

    if (playerId == 1) { //player is in top left corner
        if (direction == 'left') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'right') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'up') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'down') {
            topDia = true;
            bottomDia = false;
        }
    } else if (playerId == num) { //player is in top right corner
        if (direction == 'left') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'right') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'up') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'down') {
            topDia = false;
            bottomDia = true;
        }
    } else if (playerId <= num)  { //player is in top row
        if (direction == 'left') {
            topDia = true;
            bottomDia = false;
        } else if (direction == 'right') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'up') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'down') {
            topDia = true;
            bottomDia = true;
        }
    } else if (playerId == num*num) { //player is in bottom right
        if (direction == 'left') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'right') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'up') {
            topDia = true;
            bottomDia = false;
        } else if (direction == 'down') {
            topDia = false;
            bottomDia = false;
        }
    } else if (playerId == num*num-num+1) { //player is in bottom left
        if (direction == 'left') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'right') {
            topDia = true;
            bottomDia = false;
        } else if (direction == 'up') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'down') {
            topDia = false;
            bottomDia = false;
        }
    } else if (playerId > num*num-num) { //player is in bottom row
        if (direction == 'left') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'right') {
            topDia = true;
            bottomDia = false;
        } else if (direction == 'up') {
            topDia = true;
            bottomDia = true;
        } else if (direction == 'down') {
            topDia = false;
            bottomDia = false;
        }
    } else if ((playerId-1)%num == 0) { //player is in left row
        if (direction == 'left') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'right') {
            topDia = true;
            bottomDia = true;
        } else if (direction == 'up') {
            topDia = false;
            bottomDia = true;
        } else if (direction == 'down') {
            topDia = true;
            bottomDia = false;
        }
    } else if (playerId%num == 0) { //player is in right row
        if (direction == 'left') {
            topDia = true;
            bottomDia = true;
        } else if (direction == 'right') {
            topDia = false;
            bottomDia = false;
        } else if (direction == 'up') {
            topDia = true;
            bottomDia = false;
        } else if (direction == 'down') {
            topDia = false;
            bottomDia = true;
        }
    }
}



function shotgunCheckDirectionAndFire () {
    var bulletBox = document.getElementById((playerId + (num-1)).toString())
    bulletBox.appendChild(bullet);
    bulletBox.classList.add('bulletBox');
    changeImageDir('bullet', 'diaR', bullet);
    var intTop = setInterval(function () {bulletCheckMove('diaRDown', bullet, intTop)}, 20);
}



function fireShotgun () {
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);
    checkCanShoot ();

    //fire shotgun
    for(var i=0; i<3; i++) {
        
        if (i == 0) {
            //top diagonal
            var bullet = document.createElement('div');
            bullet.classList.add('bullet');
            var playerBox = player.parentNode;
            var playerId = parseInt(playerBox.id);
            
            if (direction == 'left') {
                if(topDia) {
                    var bulletBox = document.getElementById((playerId + (num-1)).toString())
                    bulletBox.appendChild(bullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaR', bullet);
                    var intTop = setInterval(function () {bulletCheckMove('diaRDown', bullet, intTop)}, 20);
                }
            } else if (direction == 'right') {
                if(topDia) {
                    var bulletBox = document.getElementById((playerId - (num-1)).toString())
                    bulletBox.appendChild(bullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaR', bullet);
                    bullet.id = 'topBullet';
                    var intTop = setInterval(function () {bulletCheckMove('diaRUp', bullet, intTop)}, 20);
                }
            } else if (direction == 'up') {
                if(topDia) {
                    var bulletBox = document.getElementById((playerId - (num+1)).toString())
                    bulletBox.appendChild(bullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaL', bullet);
                    var intTop = setInterval(function() {bulletCheckMove('diaLUp', bullet, intTop)}, 20);
                }
            } else if (direction == 'down') {
                if(topDia) {
                    var bulletBox = document.getElementById((playerId + (num+1)).toString())
                    bulletBox.appendChild(bullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaL', bullet);
                    var intTop = setInterval(function () {bulletCheckMove('diaLDown', bullet, intTop)}, 20);
                }
            }

        } else if (i == 1) {
            // middle bullet
            var midBullet = document.createElement('div');
            midBullet.classList.add('bullet');
            
            if (direction == 'left') {
                if((playerId - 1)%num != 0) {
                    var bulletBox = document.getElementById((playerId - 1).toString())
                    bulletBox.appendChild(midBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'left', midBullet);
                    var intMid = setInterval(function () {bulletCheckMove('left', midBullet, intMid)}, 20);
                }
            } else if (direction == 'right') {
                if(playerId%num != 0) {
                    var bulletBox = document.getElementById((playerId+1).toString())
                    bulletBox.appendChild(midBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'right', midBullet);
                    midBullet.id = 'midBullet';
                    var intMid = setInterval(function () {bulletCheckMove('right', midBullet, intMid)}, 20);
                }
            } else if (direction == 'up') {
                if(playerId > num) {
                    var bulletBox = document.getElementById((playerId-num).toString())
                    bulletBox.appendChild(midBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'up', midBullet);
                    var intMid = setInterval(function() {bulletCheckMove('up', midBullet, intMid)}, 20);
                }
            } else if (direction == 'down') {
                if(playerId <= (num*num)-num) {
                    var bulletBox = document.getElementById((playerId+num).toString())
                    bulletBox.appendChild(midBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'up', midBullet);
                    var intMid = setInterval(function () {bulletCheckMove('down', midBullet, intMid)}, 20);
                }
            }
        } else if (i == 2) {
            //bottom diagonal
            //top diagonal
            var bottomBullet = document.createElement('div');
            bottomBullet.classList.add('bullet');
            var playerBox = player.parentNode;
            var playerId = parseInt(playerBox.id);
            
            if (direction == 'left') {
                if(bottomDia) {
                    var bulletBox = document.getElementById((playerId - (num+1)).toString())
                    bulletBox.appendChild(bottomBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaL', bottomBullet);
                    var intBottom = setInterval(function () {bulletCheckMove('diaLUp', bottomBullet, intBottom)}, 20);
                }
            } else if (direction == 'right') {
                if(bottomDia) {
                    var bulletBox = document.getElementById((playerId + (num+1)).toString())
                    bulletBox.appendChild(bottomBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaL', bottomBullet);
                    var intBottom = setInterval(function () {bulletCheckMove('diaLDown', bottomBullet, intBottom)}, 20);
                }
            } else if (direction == 'up') {
                if(bottomDia) {
                    var bulletBox = document.getElementById((playerId - (num-1)).toString())
                    bulletBox.appendChild(bottomBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaR', bottomBullet);
                    var intBottom = setInterval(function() {bulletCheckMove('diaRUp', bottomBullet, intBottom)}, 20);
                }
            } else if (direction == 'down') {
                if(bottomDia) {
                    var bulletBox = document.getElementById((playerId + (num-1)).toString())
                    bulletBox.appendChild(bottomBullet);
                    bulletBox.classList.add('bulletBox');
                    changeImageDir('bullet', 'diaR', bottomBullet);
                    var intBottom = setInterval(function () {bulletCheckMove('diaRDown', bottomBullet, intBottom)}, 20);
                }
            }
        }
    }

    noWeapons[1]--;

    //change the DOM
    var numberS = document.getElementById('numberS');
    numberS.innerText = 'available: ' + noWeapons[1];
    

    if(noWeapons[1] == 0) {
        changeWeapons(49);
        weaponsStats.childNodes[3].classList.remove('weaponBox');
        weaponsStats.childNodes[3].classList.add('noWeaponBox');
    }
}



function grenadeExplode (grenade, grenadeBox, idInRadius1, idInRadius2, radius) {
    if(radius == 0) {
        //explode in grenadeBox
        grenadeBox.style.backgroundColor = 'red';
        var playerCheck = grenadeBox.querySelector('#player');
        var botCheck = grenadeBox.querySelector('.bot');

        if(playerCheck != null) {
            hp = hp - weapons.grenade.damage;
        } else if (botCheck != null) {
            //damage to bot
            var botId = botCheck.id;
            bots[botId] = bots[botId] - weapons.grenade.damage;
        }

        setTimeout(function(){
            grenadeBox.style.backgroundColor = 'white'
        },300)
    } else if (radius == 1) {
        //explode in first ring around grenadeBox
        for(var i=0; i<idInRadius1.length; i++) {
            var box = document.getElementById(idInRadius1[i]);
            box.style.backgroundColor = 'orange';
            
            //check for enemy or player or wall
            var playerCheck = box.querySelector('#player');
            var botCheck = box.querySelector('.bot');

            if(playerCheck != null) {
                hp = hp - weapons.grenade.damage;
            } else if (botCheck != null) {
                //damage to bot
                var botId = botCheck.id;
                bots[botId] = bots[botId] - weapons.grenade.damage;
            }
            
        }

        setTimeout(function(){
            for(var i=0; i<idInRadius1.length; i++) {
                var box = document.getElementById(idInRadius1[i]);
                box.style.backgroundColor = 'white';
            }
        },300)
    } else if (radius == 2) {
        //explode in second ring around grenadeBox
        for(var i=0; i<idInRadius2.length; i++) {
            var box = document.getElementById(idInRadius2[i]);
            box.style.backgroundColor = 'yellow';

            
            //check for enemy or player or wall
            var playerCheck = box.querySelector('#player');
            var botCheck = box.querySelector('.bot');

            if(playerCheck != null) {
                hp = hp - weapons.grenade.damage;
            } else if (botCheck != null) {
                //damage to bot
                var botId = botCheck.id;
                bots[botId] = bots[botId] - weapons.grenade.damage;
            }
            
        }

        setTimeout(function(){
            for(var i=0; i<idInRadius2.length; i++) {
                var box = document.getElementById(idInRadius2[i]);
                box.style.backgroundColor = 'white';
            }

            grenadeBox.removeChild(grenade);
            grenadeBox.classList.remove('grenadeBox');
        },300)
    }
    


    
}


function initGrenadeExplosion (grenade) {
    var grenadeBox = grenade.parentNode;
    var grenadeId = parseInt(grenadeBox.id);
    var idInRadius1 = checkRadius(grenadeId, 1);
    var idInRadius2 = checkRadius(grenadeId, 2);

    for(var i=0; i<idInRadius2.length; i++) {
        for(var a=0; a<idInRadius1.length; a++) {
            if(idInRadius2[i] == idInRadius1[a]) {
                idInRadius2.splice(i, 1);
            }
        }
    }
    //now, idInRadius1 has only elements that are 1 distance away from the grenade
    //now, idInRadius2 has only elements that are 2 distance away from the grenade
    
    setTimeout (function () {
        grenadeExplode(grenade, grenadeBox, idInRadius1, idInRadius2, 0);
    }, 200)

    setTimeout (function () {
        grenadeExplode(grenade, grenadeBox, idInRadius1, idInRadius2, 1);
    }, 400)

    setTimeout (function () {
        grenadeExplode(grenade, grenadeBox, idInRadius1, idInRadius2, 2);
    }, 600)
}





function fireGrenade () {
    //fire grenade
    var grenade = document.createElement('div');
    grenade.classList.add('grenade');
    var playerBox = player.parentNode;
    var playerId = parseInt(playerBox.id);

    if (direction == 'left') {
        if((playerId - 1)%num != 0 && (playerId - 2)%num != 0 && (playerId - 3)%num != 0) {
            var grenadeBox = document.getElementById((playerId - 1).toString())
            grenadeBox.appendChild(grenade);
            grenadeBox.classList.add('grenadeBox');

            setTimeout(function () {
                //move to second box
                var grenadeId = parseInt(grenadeBox.id);

                grenadeBox.removeChild(grenade);
                grenadeBox.classList.remove('grenadeBox');

                var newBox = document.getElementById((grenadeId - 1).toString());
                newBox.appendChild(grenade);
                newBox.classList.add('grenadeBox');

                setTimeout(function () {
                    //move to third box
                    var grenadeId = parseInt(newBox.id);
    
                    newBox.removeChild(grenade);
                    newBox.classList.remove('grenadeBox');
    
                    var newerBox = document.getElementById((grenadeId - 1).toString());
                    newerBox.appendChild(grenade);
                    newerBox.classList.add('grenadeBox');

                    setTimeout(function () {
                        //explode
                        initGrenadeExplosion(grenade);
                    }, 300);
                }, 100);
            }, 100);
        }
    } else if (direction == 'right') {
        if(playerId%num != 0 && (playerId+1)%num != 0 && (playerId+2)%num != 0) {
            var grenadeBox = document.getElementById((playerId + 1).toString())
            grenadeBox.appendChild(grenade);
            grenadeBox.classList.add('grenadeBox');
            
            setTimeout(function () {
                //move to second box
                var grenadeId = parseInt(grenadeBox.id);
                grenadeBox.removeChild(grenade);
                grenadeBox.classList.remove('grenadeBox');

                var newBox = document.getElementById((grenadeId + 1).toString());
                newBox.appendChild(grenade);
                newBox.classList.add('grenadeBox');

                setTimeout(function () {
                    //move to third box
                    var grenadeId = parseInt(newBox.id);
    
                    newBox.removeChild(grenade);
                    newBox.classList.remove('grenadeBox');
    
                    var newerBox = document.getElementById((grenadeId + 1).toString());
                    newerBox.appendChild(grenade);
                    newerBox.classList.add('grenadeBox');

                    setTimeout(function () {
                        //explode
                        initGrenadeExplosion(grenade);
                    }, 300);
                }, 100);
            }, 100);
        }
    } else if (direction == 'up') {
        if(playerId > num*3) {
            var grenadeBox = document.getElementById((playerId - num).toString())
            grenadeBox.appendChild(grenade);
            grenadeBox.classList.add('grenadeBox');
            
            setTimeout(function () {
                //move to second box
                var grenadeId = parseInt(grenadeBox.id);
                grenadeBox.removeChild(grenade);
                grenadeBox.classList.remove('grenadeBox');

                var newBox = document.getElementById((grenadeId - num).toString());
                newBox.appendChild(grenade);
                newBox.classList.add('grenadeBox');

                setTimeout(function () {
                    //move to third box
                    var grenadeId = parseInt(newBox.id);
    
                    newBox.removeChild(grenade);
                    newBox.classList.remove('grenadeBox');
    
                    var newerBox = document.getElementById((grenadeId - num).toString());
                    newerBox.appendChild(grenade);
                    newerBox.classList.add('grenadeBox');

                    setTimeout(function () {
                        //explode
                        initGrenadeExplosion(grenade);
                    }, 300);
                }, 100);
            }, 100);
        }
    } else if (direction == 'down') {
        if(playerId <= (num*num)-num*3) {
            var grenadeBox = document.getElementById((playerId + num).toString())
            grenadeBox.appendChild(grenade);
            grenadeBox.classList.add('grenadeBox');
            
            setTimeout(function () {
                //move to second box
                var grenadeId = parseInt(grenadeBox.id);
                grenadeBox.removeChild(grenade);
                grenadeBox.classList.remove('grenadeBox');

                var newBox = document.getElementById((grenadeId + num).toString());
                newBox.appendChild(grenade);
                newBox.classList.add('grenadeBox');

                setTimeout(function () {
                    //move to third box
                    var grenadeId = parseInt(newBox.id);
    
                    newBox.removeChild(grenade);
                    newBox.classList.remove('grenadeBox');
    
                    var newerBox = document.getElementById((grenadeId + num).toString());
                    newerBox.appendChild(grenade);
                    newerBox.classList.add('grenadeBox');

                    setTimeout(function () {
                        //explode
                        initGrenadeExplosion(grenade);
                    }, 300);
                }, 100);
            }, 100);
        }
    }

    noWeapons[2]--;
    //change the DOM
    var numberG = document.getElementById('numberG');
    numberG.innerText = 'available: ' + noWeapons[2];
    
    if(noWeapons[2] == 0) {
        changeWeapons(49);
        weaponsStats.childNodes[4].classList.remove('weaponBox');
        weaponsStats.childNodes[4].classList.add('noWeaponBox');
    }
}





//fire motion
function fire () {
    if(playerWeapon == 'pistol') {
        //fire pistol
        firePistol();
    } else if (playerWeapon == 'shotgun') {
        //fire shotgun
        fireShotgun();
    } else if (playerWeapon == 'grenade') {
        //fire grenade
        fireGrenade();
    }
    // } else if (playerWeapon == 'mine') {
    //     //plant and fire mines

    // } else if (playerWeapon == 'barrel') {
    //     //plant barrels

    // }
}