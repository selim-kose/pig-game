'use strict';

let scores, currentScore, activePlayer, playing

//selecting elemtents
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')
const score0Element = document.querySelector('#score--0')
const score1Element = document.getElementById('score--1')
const current0Element = document.getElementById('current--0')
const current1Element = document.getElementById('current--1')

const diceElement = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


//Start values
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden')


const init = function () {
   score0Element.textContent = 0;
   score1Element.textContent = 0;
   current0Element.textContent = 0;
   current1Element.textContent = 0;

   scores = [0, 0]
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   document.querySelector(`.player--0`)
      .classList.remove('player--winner')
   document.querySelector(`.player--1`)
      .classList.remove('player--winner')

   document.querySelector(`.player--${activePlayer}`)
      .classList.add('player--active')


   diceElement.classList.add('hidden')


};

init();


const changePlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = currentScore
   activePlayer = activePlayer === 0 ? 1 : 0
   currentScore = 0;
   player0Element.classList.toggle('player--active')
   player1Element.classList.toggle('player--active')
}

//rollling dice function
btnRoll.addEventListener('click', function () {
   if (playing) {
      let dice = Math.trunc(Math.random() * 6) + 1
      console.log(dice);

      diceElement.classList.remove('hidden')
      diceElement.src = `dice-${dice}.png`

      if (dice !== 1) {
         currentScore += dice;

         document.getElementById(`current--${activePlayer}`)
            .textContent = currentScore

      } else {
         changePlayer()
      }
   }
})


btnHold.addEventListener('click', function () {
   if (playing) {
      scores[activePlayer] += currentScore

      document.getElementById(`score--${activePlayer}`).textContent =
         scores[activePlayer]



      if (scores[activePlayer] >= 50) {
         playing = false;
         diceElement.classList.add('hidden')

         document.querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner')

         document.querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active')
      } else {
         changePlayer()
      }
   }
})

btnNew.addEventListener('click', init)

