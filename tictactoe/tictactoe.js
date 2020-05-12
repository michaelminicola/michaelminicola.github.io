let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;

// take player turn
function playerTakeTurn(e){

	if (e.innerHTML == "") {
	e.innerHTML = currentPlayer;
	checkGameStatus();
	} else {
		showLightBox("This box is already selected.", "Please try another.");
		return;
	} // else

	// game is over
	if (gameStatus != ""){
		showLightBox(gameStatus, "Game over.");
	}

} // playerTakeTurn


// after each turn, check for a winner, a tie, 
// or continue playing
function checkGameStatus(){
	numTurns++; // count turn

// check for a win
if (checkWin()){
	gameStatus = currentPlayer + " wins!";
}


// check for tie
if (numTurns == 9) {
	gameStatus = "Tie Game"; 
} //  if

	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
 
} // checkGameStatus

// check for a win, there is 8 win paths
function checkWin() {
	let cb = []; // current board
	cb[0] = ""; // not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

	// top row
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	// middle row
	} if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	// bottom row
	} if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	// left column
	} if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	// middle column
	} if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	// right column
	} if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	// left diagonal
	} if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	// right diagonal
	} if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;

	} // if
} // checkWin


// change the visibility of ID
function changeVisibility(divID) {
	var element = document.getElementById(divID);

	// if element exists, it is considered true
	if (element) {
		element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
	} // if
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2) {
	// set message
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	// show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // show light box

// close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

	// if the game is over, show controls

} // continueGame








