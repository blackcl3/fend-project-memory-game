let cards = [
			"fa-diamond", "fa-diamond",
			"fa-paper-plane-o","fa-paper-plane-o",
			"fa-anchor", "fa-anchor",
			"fa-bolt", "fa-bolt",
			"fa-cube", "fa-cube",
			"fa-leaf", "fa-leaf",
			"fa-bicycle", "fa-bicycle",
			"fa-bomb", "fa-bomb"
			];

let moves = document.querySelector(".moves");
let restartButton = document.querySelectorAll(".restart");

initGame();

let container = document.querySelector(".container");
let allCards = document.querySelectorAll(".card");
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
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function derived from https://www.reddit.com/r/learnjavascript/comments/3rfyi2/which_is_the_better_way_to_add_an_event_listener/


container.addEventListener('click', function(e){
	if(!clicked) {
		clicked = true;
		startTimer();
	}

});



allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {

		if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")){
				//add && !openCardList.length > 2
			openCardList.push(card);
			display(card);
		};

		if(openCardList.length == 2) {

		setTimeout(function(){
			openCardList.forEach(function(card){
				card.classList.remove("open", "show");

			});
			checkOpenCard(card);
			moveCounter();
			openCardList = [];

		}, 1000);
		} else if (openCardList.length > 2) {
		//don't add more cards, disable click
			card.classList.remove("open", "show");
	}

	// }
});

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

function generateCard(card) {
	return `<li class="card">` + `<i class='fa ${card}'></i>` + `</li>`;

}

function initGame() {
	shuffle(cards);
	moves.innerHTML = 0;
	let deck = document.querySelector(".deck");
	let cardHTML = cards.map(function(card){
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

function startTimer() {

	myTimer = setInterval(function() {
		second++;
		seconds.innerText = second % 60;
		minutes.innerText = parseInt(second / 60);

	}, 1000);

};



function display(card) {
	 card.classList.add("open", "show");
};

function stopTimer() {
	clearInterval(myTimer);
}

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

// function derived from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility_notes
function checkOpenCard(card) {
  		let openCardFirst  = openCardList[0].firstChild.className;
  		let openCardSecond = openCardList[1].firstChild.className;
  		console.log(openCardList)

			//function runs through the array and sees if card matches
			if(openCardFirst === openCardSecond){
				listMatch();
				// lock function
			} else {
				console.log("not equal");
				// remove from list, hide (), separate function
			}
		//check cards and see if they match, if match, lock (keep open and show classes, add match class) (requires separate function)
		// if no match, remove cards from list and hide cards (remove open and show classes) (requires separate function)
};



function listMatch(card, cardtwo) {
	for(i = 0; i < openCardList.length; i++){
		openCardList[i].classList.add("open", "show", "match");
		cardMatchList.push(card);
		if (cardMatchList.length === 16) {
			matchWin();
		}
	}

};

function reset() {
	winner = false;
	clicked = false;
	allCards.forEach(function(card){
			card.classList.remove("open", "show", "match");
		});
	stars.forEach(function(star){
		star.firstChild.classList.add("fa-star");
		star.firstChild.classList.remove("fa-star-o");

	});
	cardMatchList = [];
	move = 0;
	second = 0;
	moves.innerHTML = 0;
	minutes.innerText = 0;
	seconds.innerText = 0;
	stopTimer(myTimer);
	shuffle(cards);
}

function matchWin () {
	winner = true;
	stopTimer(myTimer);
	moveCounter();
	modal.classList.add("show-modal");
	modalContentChild.innerText = ("Winner! That took you " + (move+1) + " moves and " + second + " seconds! " + starCounter + " stars for you!");
}




