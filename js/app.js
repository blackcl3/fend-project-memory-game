/*
 * Create a list that holds all of your cards
 */


const memoryCard = document.querySelectorAll(".deck li");
const deck = document.querySelector(".deck");
const scorePanel = document.querySelectorAll(".score-panel");
const stars	= document.querySelectorAll(".scores");
const moves = document.querySelectorAll(".moves");
const restartButton = document.querySelectorAll(".restart");
const openCardList = [];


/*

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }


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
deck.addEventListener('click', function(e) {
	if(/card/.test(e.target.className)) {
		//add class 'open
		// e.target.classList.add("open", "show");
		let cardEventTarget = e.target;
		let cardEventTargetChild = e.target.children;
		//convert cardEventTargetCHild from HTML collection to array, so that class can be accessed
		const cardChildArray = Array.from(cardEventTargetChild);
		display(cardEventTarget);
		addToOpenCardList(cardChildArray);
		checkOpenCard(cardChildArray);
	}
}, false);

function display(cardEventTarget) {
	 cardEventTarget.classList.add("open", "show");
};

function addToOpenCardList(cardChildArray) {
	//add to array of open cards
	//this list will continue to grow as cards are matched properly
	openCardList.push(cardChildArray);
	if(openCardList.length > 1) {
		checkOpenCard(openCardList)
	}

};

function checkOpenCard(openCardList, cardarray) {
		if (openCardList.indexOf(cardarray) === -1) {
        	console.log('New array is : ' + openCardList);
    	} else if (openCardList.indexOf(cardarray) > -1) {
        	console.log(cardarray + ' already exists in the veggies collection.');
    	}

		// for(let i = 1; i < openCardList.length; i++){
		// 	//function runs through the array and sees if card matches
		// 	if(openCardList[i][0] === openCardList[(i-1)][0]){
		// 		console.log("equals");
		// 		// lock function
		// 	} else {
		// 		console.log("not equal");
		// 		// remove from list, hide (), separate function
		// 	}
		// };
		// //check cards and see if they match, if match, lock (keep open and show classes, add match class) (requires separate function)
		// // if no match, remove cards from list and hide cards (remove open and show classes) (requires separate function)
};

function listMatch(cardEventTargetChild) {

};

