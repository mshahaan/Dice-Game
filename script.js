'use strict';

// Selecting Elements
// querySelector(elementID) === getElementByID(elementID)
// if you're sending in an ID to the querySelector method then
// getElementByID does the same thing except you do not need the 
// '#' since the method knows the argument is an ID
// getElementByID is a faster method so it is better for
// larger programs/datasets where you are using element IDs
const elementScore0 = document.querySelector('#score--0');
const elementScore1 = document.getElementById('score--1');
const elementCurrent0 = document.getElementById('current--0');
const elementCurrent1 = document.getElementById('current--1');
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const elementDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Global Variables
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

// Common functions

// Switching Players
function switchPlayer() {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    // for the add and remove methods we also had to make use of the contains
    // method to check if the class was present
    // with the toggle method, this is done for us
    // toggle(class) will add the class to the element if it is not there and
    // remove it is it is
    elementPlayer0.classList.toggle('player--active');
    elementPlayer1.classList.toggle('player--active');


}

// Update Current Score
function updateCurrentScore() {

    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

}

// Update Total Score
function updateScore() {

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

}

function declareWinner() {

    playing = false;
    elementDice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {

    // Do not do anything with button if the game is over
    if(!playing) return;
    
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    elementDice.src = `dice-${dice}.png`;
    elementDice.classList.remove('hidden');

    //Check if roll is a 1: if true, switch player
    if(dice !== 1){

        // Add dice to current score
        currentScore += dice;
        updateCurrentScore();

    } else {

        // Switch player
        switchPlayer();

    }

})

// Holding score functionality

btnHold.addEventListener('click', function() {

    // Do not do anything with button if the game is over
    if(!playing) return;

    // Add current score to total score
    scores[activePlayer] += currentScore;

    // Display new total score
    updateScore();

    // Reset current score
    currentScore = 0;
    updateCurrentScore();

    // Check if score is Greater than 100
    if (scores[activePlayer] >= 100) {

        declareWinner();

    } else {

        // Switch player
        switchPlayer();

    }

})

// New Game Functionality

btnNew.addEventListener('click', function() {

    // Reset Current Score
    currentScore = 0;
    updateCurrentScore();
    activePlayer = activePlayer === 0 ? 1 : 0;
    updateCurrentScore();

    // Reset Total Scores
    scores[0] = 0;
    scores[1] = 0;
    updateScore();
    activePlayer = activePlayer === 0 ? 1 : 0;
    updateScore();

    // Set Active Player to Player 0
    activePlayer = 0;
    elementPlayer0.classList.toggle('player--active', true);
    elementPlayer1.classList.toggle('player--active', false);

    // Set playing to true
    playing = true;

    // Remove player--winner class from any player with it
    elementPlayer0.classList.toggle('player--winner', false);
    elementPlayer1.classList.toggle('player--winner', false);

    // Hide Dice
    elementDice.classList.add('hidden');

})
