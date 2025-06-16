import {
    card, wordCard, meaningCard, addCardBtn, addCardForm, addCardFormBtn, removeCardBtn, removeCardForm, previousCard, nextCard, confirmDeletionBtn, discardDeletionBtn, overlay, closeForm
} from '../dom.js';
import { saveDecks, loadDecks } from '../storage.js';

let currentCardIndex = 0;

let decks = loadDecks();

const currentDeckIndex = parseInt(localStorage.getItem('currentDeckIndex'), 10);
let currentDeck = !isNaN(currentDeckIndex) ? decks[currentDeckIndex] : null;
let cards = currentDeck ? currentDeck.cards : [];

if (currentCardIndex >= cards.length) {
    currentCardIndex = cards.length - 1;
}

if (currentCardIndex < 0) {
    currentCardIndex = 0;
}

updateCard();


// Flip effect

card.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

// Close button on every form

closeForm.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    overlay.classList.add('hidden');
    addCardForm.classList.add('hidden');
    removeCardForm.classList.add('hidden');
    createDeckForm.classList.add('hidden');
  });
});

// Add card

addCardBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    addCardForm.classList.remove('hidden');
});

addCardFormBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const wordInput = document.getElementById('word').value;
    const meaningInput = document.getElementById('meaning').value

    if (wordInput.trim() !== '' && meaningInput.trim() !== '') {
        cards.push({
            word: wordInput.trim(), 
            meaning: meaningInput.trim(),
        });

        currentCardIndex = cards.length - 1;
        updateCard();
        saveDecks(decks);

        addCardForm.classList.add('hidden');
        overlay.classList.add('hidden');

        document.getElementById('word').value = '';
        document.getElementById('meaning').value = '';

    }
});

// Switching between existed cards
previousCard.addEventListener('click', () => {
    currentCardIndex--;

    if (currentCardIndex < 0) {
        currentCardIndex = cards.length - 1;
    }

    card.classList.remove('flipped');
    updateCard();
});

nextCard.addEventListener('click', () => {
    currentCardIndex++;
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0;
    }
    
    card.classList.remove('flipped');
    updateCard();
});

// Remove the card 
removeCardBtn.addEventListener('click', () => {
    if (cards.length > 0) {
        removeCardForm.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
});

confirmDeletionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cards.splice(currentCardIndex, 1);

    if (cards.length === 0) {
        currentCardIndex = 0;
    } else if (currentCardIndex >= cards.length) {
        currentCardIndex = cards.length - 1;
    }


    removeCardForm.classList.add('hidden');
    overlay.classList.add('hidden');
    
    updateCard();
    saveDecks(decks);
});

discardDeletionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeCardForm.classList.add('hidden');
    overlay.classList.add('hidden');
})

function updateCard() {
    if (cards.length === 0 || currentCardIndex < 0 || currentCardIndex >= cards.length) {
        wordCard.textContent = '';
        meaningCard.textContent = '';
        document.querySelector('.current-card').textContent = '0/0';
        return;
    }

    wordCard.textContent = cards[currentCardIndex].word;
    meaningCard.textContent = cards[currentCardIndex].meaning;
    document.querySelector('.current-card').textContent = `${currentCardIndex + 1}/${cards.length}`;
    
}