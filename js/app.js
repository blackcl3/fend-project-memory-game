/*
 * Create a list that holds all of your cards
 */


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

function generateCard(card) {
	return `<li class="card">` + `<i class='fa ${card}'></i>` + `</li>`;

}

function initGame() {
	shuffle(cards);
	let deck = document.querySelector(".deck");
	let cardHTML = cards.map(function(card){
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join('');

}

initGame();

let allCards = document.querySelectorAll(".card");
const scorePanel = document.querySelectorAll(".score-panel");
const stars	= document.querySelectorAll(".scores");
const moves = document.querySelectorAll(".moves");
const restartButton = document.querySelectorAll(".restart");
let openCardList = [];


/*

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")){
				//add && !openCardList.length > 2
			openCardList.push(card);
			display(card);
			console.log("working");
		};

		if(openCardList.length == 2) {
		//hide
		setTimeout(function(){
			openCardList.forEach(function(card){
				card.classList.remove("open", "show");

			});
			checkOpenCard(card);
			openCardList = [];
		}, 2000);
		} else if (openCardList.length > 2) {
		//don't add more cards, disable click
			card.classList.remove("open", "show");
	}

	// }
});

});


function display(card) {
	 card.classList.add("open", "show");
};

function addToOpenCardList(cardChildArray) {
	//add to array of open cards
	//this list will continue to grow as cards are matched properly

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
	}

};

