// global variables
var speedofPaddle1 = 0;
var speedofPaddle2 = 0;
const startPositionofPaddle1 = document.getElementById("paddle1").offsetTop;
var positionofPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionofPaddle2 = document.getElementById("paddle2").offsetTop;
var positionofPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetTop;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedofBall = 0;

var bounce = new sound("smack.mp3");
var goal = new sound("buzzer.mp3");

var controlPlay;

// start ball motion
/* window.addEventListener('load',function() {
	startBall(); )
}); */

// Move paddles
document.addEventListener('keydown', function(e) {
	// console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { // w 
		speedofPaddle1 = -10;
	}
	if (e.keyCode == 38 || e.which == 38) { // up arrow
		speedofPaddle2 = -10;
	}
	if (e.keyCode == 83 || e.which == 83) { // s
		speedofPaddle1 = 10;
	}
	if (e.keyCode == 40 || e.which == 40) { // down arrow
		speedofPaddle2 = 10;
	}
	

});

// stop paddles
document.addEventListener('keyup', function(e) {
	// console.log("key up " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) { // w
		speedofPaddle1 = 0;
	}
	if (e.keyCode == 38 || e.which == 38) { // up arrow
		speedofPaddle2 = 0;
	}
	if (e.keyCode == 83 || e.which == 83) { // s
		speedofPaddle1 = 0;
	}
	if (e.keyCode == 40 || e.which == 40) { // down arrow
		speedofPaddle2 = 0;
	}

});

// object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// starts the ball movement
function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	// 50% chance of starting in either direction
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	}

	topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
	leftSpeedofBall = direction * (Math.random() * 2 + 3);



} // startBall

// updates locations of paddles and ball
function show() {

	// update positions of elements 
	positionofPaddle1 += speedofPaddle1;
	positionofPaddle2 += speedofPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedofBall;

	// stop paddle from leaving top of gameboard
	if (positionofPaddle1 <= 0) {
		positionofPaddle1 = 0;
	} 

	if (positionofPaddle2 <= 0) {
		positionofPaddle2 = 0;
	} 

	// stop the paddle from leacing the bottom of gameboard
	if (positionofPaddle1 >= gameBoardHeight - paddleHeight) {
		positionofPaddle1 = gameBoardHeight - paddleHeight;
	}
	if (positionofPaddle2 >= gameBoardHeight - paddleHeight) {
		positionofPaddle2 = gameBoardHeight - paddleHeight;
	}

	// if ball hits top or bottom of gameboard change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight) {
		topSpeedOfBall *= -1;
	} // if

	// ball on left edge of gameboard
	if (leftPositionOfBall <= paddleWidth) {

		// if ball hits left paddle, change direction
		if (topPositionOfBall > positionofPaddle1 && topPositionOfBall < positionofPaddle1 + paddleHeight) {
			leftSpeedofBall *= -1;
			bounce.play();
		} else {
			startBall();
			goal.play();
			score2 += 1;
			document.getElementById("right").innerHTML = ("Score 2: " + score2);
			if (score2 == 10) {
				stopGame();
			}
		} // else
	} // if

	// ball on right edge of gameboard
	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {

		// if ball hits right paddle, change direction
		if (topPositionOfBall > positionofPaddle2 &&
				topPositionOfBall < positionofPaddle2 + paddleHeight) {
			leftSpeedofBall *= -1;
			bounce.play();
		} else {
			startBall();
			goal.play();
			score1 += 1;
			document.getElementById("left").innerHTML = ("Score 1: " + score1);
			if (score1 == 10) {
				stopGame();
			}
		} // else
	} // if
	

	document.getElementById("paddle1").style.top = positionofPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionofPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

} // show

// resume game play
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}
} // resumegame

// pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
} //pausegame

//start game play
function startGame() {
	score1 = 0;
	score2 = 0;
	document.getElementById("left").innerHTML = ("Score 1: " + score1);
	document.getElementById("right").innerHTML = ("Score 2: " + score2);

	startBall();
	positionofPaddle1 = startPositionofPaddle1;
	positionofPaddle2 = startPositionofPaddle2;


	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}
} // startgame

// stop game play
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;

	// show lightbox with score
	let message1 = "Tie Game";
	let message2 = "close to continue";

	if (score2 > score1) {
		message1 = "Player 2 wins with " + score2 + " points!";
		message2 = "Player 1 had " + score1 + " points!";

	} else if (score1 > score2) {
		message1 = "Player 1 wins with " + score1 + " points!";
		message2 = "Player 2 had " + score2 + " points!";
	} // else

	showLightBox(message1, message2);

} // stopGame

// change the visibility of ID
function changeVisibility(divID) {
	var element = document.getElementById(divID);

	// if element exists, it is considered true
	if (element) {
		element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
	} // if
} // changeVisibility

// display message in lightbox
function showLightBox(message1, message2) {
	// set message
	document.getElementById("message1").innerHTML = message1;
	document.getElementById("message2").innerHTML = message2;

	// show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // show light box

// close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

} // continueGame





