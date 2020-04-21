const cards = document.querySelectorAll('.card');

let currentCard = 0;
const cardSelector = document.querySelectorAll('.selector');
/*
cardSelector[currentCard].classList.toggle('selectorActive');

document.onkeydown = function(event){
  if(event.keyCode === 39 || event.which === 39){
    cardSelector[currentCard].classList.toggle('selectorActive')
    currentCard += 1;
    cardSelector[currentCard].classList.toggle('selectorActive')
  }
}
*/




let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  // This will disable any clicks that occur before the non-matched cards reset
  if(lockBoard)
    return;
  // This will prevent a double click on the same card to obtain a match
  if(this === firstCard)
    return;
  
  this.classList.add('flip');
  
  if(!hasFlippedCard){
    // First card is clicked
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  } 
  
// Second card is clicked
secondCard = this;
    
// Check if cards match
checkForMatch();    
}


//This function will check if the two cards chosen match
function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
    disableCards();
  } else {
    unflipCards();
  }
}

//This function will disable the chosen cards whenever there's a match
function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  resetBoard();
}

//This function will reset the cards if they don't match
function unflipCards(){
  lockBoard = true;
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  
  for(let x = 0; x < cardSelector.length; x++){
    let randomPos = Math.floor(Math.random() * 17);
    cardSelector[x].style.order = randomPos;
  }
  
})();

cards.forEach(card => card.addEventListener('click', flipCard));