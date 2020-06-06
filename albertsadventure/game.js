const levels = [	
	// level 0
	["flag", "rock", "", "", "",
	"fenceside", "rock", "", "", "rider",
	"", "tree", "animate", "animate", "animate",
	"", "water", "", "", "",
	"", "fenceup", "", "pigup", ""],

	// level 1
	["flag", "water", "", "", "",
	"fenceside", "water", "", "", "rider",
	"animate", "bridge animate", "animate", "animate", "animate",
	"", "water", "", "", "",
	"", "water", "pigup", "", ""],

	// level 2
	["tree", "tree", "flag", "tree", "tree",
	"animate", "animate", "animate", "animate", "animate",
	"water", "bridge", "water", "water", "water",
	"", "", "", "fenceup", "",
	"rider", "rock", "", "", "pigup"]

	]; // end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0;
var riderOn = false; 
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level

window.addEventListener("load", function() {
	loadLevel();
});

function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	// load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
	} // for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");

} // loadLevel

// animate enemy left to right
function animateEnemy(boxes, index, direction) {
	if (boxes.length <= 0) { return; }

	// update images
	if (direction == "right") {
		boxes[index].classList.add("badpigright");
	} else {
		boxes[index].classList.add("badpigleft");
	} // else

	// remove images from other boxes
	for (i = 0; i < boxes.length; i++){
		if (i != index) {
			boxes[i].classList.remove("badpigleft");
			boxes[i].classList.remove("badpigright");
		}

	} // for

	// moving right
	if (direction == "right") {
		// turn around if hit right side
		if (index == boxes.length -1){
			index--;
			direction = "left";
		} else {
			index++;
		}

	// moving left
	} else {
		// turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		}
	} //else

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
} // animate enemy