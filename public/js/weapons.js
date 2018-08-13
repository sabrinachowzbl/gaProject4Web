
var noWeapons = [1,200,10];

var weapons = {
    'pistol': {
        'name': 'pistol',
        'damage': 200,
        //press 1 for pistol
        'keyCode': 49
    },

    'shotgun': {
        'name': 'shotgun',
        'damage': 400,
        //press 2 for shotgun
        'keyCode': 50
    }, 

    'grenade': {
        'name': 'grenade',
        'damage': 1000,
        //press 3 for grenade
        'keyCode': 51
    }, 

    'mine': {
        'name': 'mine',
        'damage': 300,
        //press 4 for mine
        'keyCode': 52
    },

    'barrel': {
        'name': 'barrel',
        'damage': 400,
        //press 5 for barrel
        'keyCode': 53
    }
}

//change weapon colour
function changeWeaponColour (playerWeapon, newPlayerWeapon) {
    var numberOld = 0;
    var numberNew = 0;

    //for previous weapon
    if(playerWeapon == 'pistol') {
        numberOld = 1;
    } else if (playerWeapon == 'shotgun') {
        numberOld = 2;
    } else if (playerWeapon == 'grenade') {
        numberOld = 3;
    }

    //for new weapon
    if(newPlayerWeapon == 'pistol') {
        numberNew = 1;
    } else if (newPlayerWeapon == 'shotgun') {
        numberNew = 2;
    } else if (newPlayerWeapon == 'grenade') {
        numberNew = 3;
    }

    weaponsStats.childNodes[numberOld].classList.remove('weaponBoxChosen');
    weaponsStats.childNodes[numberOld].classList.add('weaponBox');
    weaponsStats.childNodes[numberNew].classList.remove('weaponBox');
    weaponsStats.childNodes[numberNew].classList.add('weaponBoxChosen');
}


//to change the weapons.
function changeWeapons (key) {
    if (key == weapons.pistol.keyCode) {
        changeWeaponColour(playerWeapon, 'pistol');
        playerWeapon = 'pistol';
    } else if (key == weapons.shotgun.keyCode) {
        if(noWeapons[1] > 0) {
            changeWeaponColour(playerWeapon, 'shotgun');
            playerWeapon = 'shotgun';
        }
    } else if (key == weapons.grenade.keyCode) {
        if (noWeapons[2] > 0) {
            changeWeaponColour(playerWeapon, 'grenade');
            playerWeapon = 'grenade';
        }
    } 
    // else if (key == weapons.mine.keyCode) {
    //     if (noWeapons[3] > 0) {
    //         playerWeapon = 'mine';
    //     }
    // } else if (key == weapons.barrel.keyCode) {
    //     if (noWeapons[4] > 0) {
    //         playerWeapon = 'barrel';
    //     }
    // }
}  