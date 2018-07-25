let cardList = [
			"fa-diamond",
			"fa-paper-plane-o",
			"fa-anchor",
			"fa-bolt",
			"fa-cube",
			"fa-leaf",
			"fa-bicycle",
			"fa-bomb"
			];
let shuffledDeck = shuffle(cardList);
let doubleCardList = cardList.push(...cardList);
let moves = document.querySelector(".moves");
let restartButton = document.querySelectorAll(".restart");
const deck = document.querySelector(".deck");



initGame();



let container = document.querySelector(".container");
let allCard = document.querySelectorAll("li.card");
let stars	= document.querySelectorAll("ul.stars li");
let openCardList = [];
let cardMatchList = [];
let second = 0;
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let move = 0;
let modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modal-content");
let modalContentChild = modalContent.children[1];
let closeButton = document.querySelector(".close-button");
let timer = document.querySelector(".timer");
let clicked = false;
let winner = false;
let myTimer = "";


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" card (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two card match
 *    + if the card do match, lock the card in the open position (put this functionality in another function that you call from this one)
 *    + if the card do not match, remove the card from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all card have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function derived from https://www.reddit.com/r/learnjavascript/comments/3rfyi2/which_is_the_better_way_to_add_an_event_listener/

//allows deck to be clicked and timer to start if not already begun
deck.addEventListener('click', function(e){
	if(!clicked) {
		clicked = true;
		startTimer();
	}

});



allCard.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match") && !(openCardList.length > 2)){
				//add && !openCardList.length > 2
				openCardList.push(card);
				cardDisplay(card);
		}
	});
	// }
});





closeButton.addEventListener('click', function(){
	modal.classList.toggle("show-modal");
});

restartButton.forEach(function(button){
		button.addEventListener('click', function(){
			modal.classList.remove("show-modal");
			reset();
	});
});


//generate new card in deck
function generateCard(card) {
	return `<li class="card">` + `<i class='fa ${card}'></i>` + `</li>`;

}


//begins game, adds cards to deck
function initGame() {
	shuffledDeck;
	moves.innerHTML = 0;
	const cardHTML = cardList.map(function(card){
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join('');

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//timer function derived from https://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
// starts timer keeping track of game time
function startTimer() {

	myTimer = setInterval(function() {
		second++;
		seconds.innerText = second % 60;
		minutes.innerText = parseInt(second / 60);

	}, 1000);

};

// stops timer
function stopTimer() {
	clearInterval(myTimer);
};

function display(card) {
	 card.classList.add("open", "show");
};


// keeps track of number of moves, and assigns a star score based on this number of moves
function moveCounter() {

 	starCounter = 3;
	move ++;
	if (move > 8 && move < 12) {

		stars[2].firstChild.classList.remove("fa-star");
		stars[2].firstChild.classList.add("fa-star-o");
		starCounter = 2;

	} else if (move >= 12  && move <= 20) {
		stars[1].firstChild.classList.remove("fa-star");
		stars[1].firstChild.classList.add("fa-star-o");
		starCounter = 1;

	} else if (move > 21 ) {
		stars[0].firstChild.classList.remove("fa-star");
		stars[0].firstChild.classList.add("fa-star-o");
		starCounter = 0;
	}

	moves.innerHTML = move;

};

//card logic

//shows card, compares to other card, removes from list if no match, and times out if no match
function cardDisplay(card){
	if(openCardList.length <= 2) {

		display(card);
		checkOpenCard(card);
		moveCounter();

	} else {
		// card.classList.remove("open", "show");
	//don't add more card, disable click
		openCardList.pop();

	};

	setTimeout(function(){
			openCardList.forEach(function(card){
				card.classList.remove("open", "show");

			});
			openCardList = [];

	}, 1000);
}


// function derived from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility_notes
// checks card in openCardList against each other, calls listMatch() if they do
function checkOpenCard(card) {
  		let openCardFirst  = openCardList[0].firstChild.className;
  		let openCardecond = openCardList[1].firstChild.className;

			//function runs through the array and sees if card matches
			if(openCardFirst === openCardecond){
				listMatch();
				// lock function
			} else {
				// remove from list, hide (), separate function
				return;
			}

};


//functionality for a winning match
function listMatch(card, cardtwo) {
	for(i = 0; i < openCardList.length; i++){
		openCardList[i].classList.add("open", "show", "match");
		cardMatchList.push(card);
	}
	if (cardMatchList.length === 16) {
			matchWin();
		}

};

//called when match is won, calls a modal with score, time, and number of moves
function matchWin () {
	winner = true;
	stopTimer(myTimer);
	moveCounter();
	modal.classList.add("show-modal");
	modalContentChild.innerText = ("Winner! That took you " + (move+1) + " moves and " + second + " seconds! " + starCounter + " stars for you!");
}



function resetMoves() {
	moves.innerHTML = 0;
	move = 0;
	stars.forEach(function(star){
		star.firstChild.classList.add("fa-star");
		star.firstChild.classList.remove("fa-star-o");

	});
}

function resetTimer() {
	second = 0;
	minutes.innerText = 0;
	seconds.innerText = 0;
	stopTimer(myTimer);
}

function resetCards() {
	allCard.forEach(function(card){
		card.classList.remove("open", "show", "match");
	});
	shuffle(cardList);
	openCardList = [];
}

function reset() {
	resetMoves();
	resetTimer();
	resetCards();
	clicked = false;
	winner = false;
	initGame();
	const container = document.querySelector(".container");
	const allCard = document.querySelectorAll("li.card");
	allCard.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match") && !(openCardList.length > 2)){
				//add && !openCardList.length > 2
				openCardList.push(card);
				cardDisplay(card);
		}
	});
	// }
});


}






