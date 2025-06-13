// import {
//   wordCard,
//   meaningCard,
//   addCardsBtn,
//   addCardsForm,
//   removeCardsForm,
//   closeCardsForm,
//   card,
//   addCard,
//   addCardExtra,
//   removeCard,
//   nextCard,
//   previousCard,
//   acceptDeletion,
//   discardDeletion,
//   overlay,
//   addForm,
// } from '../dom.js';

// let currentCardIndex = 0;
// let cards = [];

card.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

// addCard.addEventListener('click', () => {
//     overlay.classList.remove('hidden');
//     addCardsForm.classList.remove('hidden');
// });

// addCardsBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     const wordInput = document.getElementById('word').value.trim();
//     const meaningInput = document.getElementById('meaning').value.trim();

//     if (wordInput !== '' && meaningInput !== '') {
//         flashcards.push({
//             word: wordInput, 
//             meaning: meaningInput,
//         });

//         currentCardIndex = cards.length - 1;
//         updateCard();

//         addForm.classList.add('hidden');
//         overlay.classList.add('hidden');

//         document.getElementById('word').value = '';
//         document.getElementById('meaning').value = '';

//         renderAllCards();
//     }
// });



// function updateCard() {
//     if (cards.length === 0 || currentCardIndex < 0 || currentCardIndex >= cards.length) {
//         wordCard.textContent = '';
//         meaningCard.textContent = '';
//         document.querySelector('.cards-amount').textContent = '0/0';
//         return; 
//     }

//     wordCard.textContent = cards[currentCardIndex].word;
//     meaningCard.textContent = cards[currentCardIndex].meaning;
// };

// function renderAllCards() {
// // TODO: Make the function here to display all cards that were created by us.
// };

