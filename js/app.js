/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
let cards = [...card];

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

// create a new game
function newGame() {
    let shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        deck.innerHTML = "";
        shuffleCards;
        cards.forEach(function (image) {
            deck.appendChild(image);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disable');
    }
}

// run new game when page is loaded/refreshed
window.onload = newGame();


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

 // click cards will show the hidden side
 for (let i = 0; i < cards.length; i++) {
     cards[i].addEventListener('click', function (evt) {
         event.preventDefault();
         this.classList.toggle('show');
         this.classList.toggle('open');
         this.classList.toggle('disable');
     });
     cards[i].addEventListener('click', openCard);
 }

// list of open cards
let openedCards = [];

// function to open and match cards
function openCard() {
    openedCards.push(this);

    let num = openedCards.length;

    if (num === 2) {
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            matches();
        } else {
            mismatched();
        }
    };
}

// if cards match
function matches() {
    openedCards[0].classList.add('match', 'disable');
    openedCards[1].classList.add('match', 'disable');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');

    openedCards = [];
}

// if cards don't match
function mismatched() {
    openedCards[0].classList.add('mismatched');
    openedCards[1].classList.add('mismatched');

    disable();

    // close opened cards
    setTimeout(function () {
        openedCards[0].classList.remove('show', 'open', 'mismatched');
        openedCards[1].classList.remove('show', 'open', 'mismatched');

        openedCards = [];
    }, 800);
}

// disable click feature of cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disable');
    });
}
