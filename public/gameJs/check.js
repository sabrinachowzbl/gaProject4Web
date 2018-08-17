var check = 0;
var winState;

function updateProgressBar() {
    var elem = document.getElementById("myBar");   
    var width = (hp/1000)*100;

    elem.style.width = width + '%'; 
}

function checkWinLoss (int) {
    var getBots = document.getElementsByClassName('bot');

    //updating the hp stats on the right
    var myHealth = document.getElementById('hp');
    myHealth.innerText = 'HP: ' + hp + " / 1000";

    updateProgressBar();

    //checking if ded
    if(getBots.length == 0 && check>=2) {
        var text = document.getElementsByClassName('text')[0].childNodes[0];
        text.style.color = 'green';
        text.innerText = 'YOU WON!';
        clearInterval(int);
		clearInterval(botCheckInt);
		renderContinueButton('won');
    }

    if(hp <= 0 && check>=2) {
        var text = document.getElementsByClassName('text')[0].childNodes[0];
        text.style.color = 'red';
        text.innerText = 'YOU LOST!';
        setTimeout(function () {
            text.style.color = 'red';
        }, 1000);
        setTimeout(function () {
            text.style.color = 'red';
        }, 1500);
        setTimeout(function () {
            text.style.color = 'red';
        }, 2000);

        //remove player
        var playerBox = player.parentNode;
        playerBox.removeChild(player);
        playerBox.classList.remove('playerBox');

		clearInterval(int);
		renderContinueButton('lost');
	}

    check++;
}


function renderContinueButton(winState) {
	let shit = document.getElementById('replayBtn');

	//build form
	let form = document.createElement('form');
	form.method = 'post';
	form.action = '/postGameStats';

	//build input text to put the win/loss state
	console.log('winState: ' + winState);
	debugger;
	let input = document.createElement('input');
	input.type = 'text';
	input.value = winState;
	input.name = 'winLoss';
	input.style.display = 'none';

	//build submit button
	let button = document.createElement('input');
	button.type = 'submit';
	button.classList.add('btn');
	button.classList.add('btn-primary');	
	button.value = 'replay';
	
	//adding elements to the DOM
	form.appendChild(input);
	form.appendChild(button);
	shit.appendChild(form);
}
