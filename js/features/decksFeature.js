import {
    singleDeckSection,
    deckSection,
    decksContainer, 
    decksStatus,
    createDeckForm,
    createDeckFormBtn,
    createDeckBtn,
    closeForm,
    overlay,
} from "../dom.js";

import { saveDecks, loadDecks } from "../storage.js";

let decks = loadDecks();

const renderAllDecks = () => {

    const decksListContainer = document.querySelector('.decks-container');
    decksListContainer.innerHTML = '';

    for (let i = 0; i < decks.length; i++) {
        const deckContainer = document.createElement('div');
        deckContainer.classList.add('deck');

        deckContainer.setAttribute('data-index', i);

        const deckName = document.createElement('h1');
        deckName.classList.add('deck-name');
        deckName.textContent = decks[i].deckName;

        const deckDescription = document.createElement('p');
        deckDescription.classList.add('deck-description');
        deckDescription.textContent = decks[i].deckDescription
        ? decks[i].deckDescription
        : 'No description.';

        deckContainer.appendChild(deckName);
        deckContainer.appendChild(deckDescription);

        decksListContainer.appendChild (deckContainer);
    }

    decksListContainer.classList.remove('hidden');
};

// Updating decks

const updateDecks = () => {
    saveDecks(decks);
    if (decks.length === 0) {
        decksStatus.innerHTML = 'You do not have any decks yet. <br>To create your first deck, please click the "+" button.';
        return;
    } else {
        decksStatus.innerHTML = 'Great! Your flashcard decks are ready. <br>Select one to begin learning or add more to expand your collection.';
        return;
    }
};

// Creating decks

createDeckBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    createDeckForm.classList.remove('hidden');
});

createDeckFormBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    let deckTitle = document.getElementById('deck-name').value.trim();
    let deckSubtitle = document.getElementById('deck-description').value.trim();

    if (deckTitle !== '') {
        decks.push({
                deckName: deckTitle, 
                deckDescription: deckSubtitle,
                cards: [] 
            }); 
        saveDecks(decks);

        overlay.classList.add('hidden');
        createDeckForm.classList.add('hidden');

        document.getElementById('deck-name').value = '';
        document.getElementById('deck-description').value = '';

        updateDecks();
        renderAllDecks();
    }

});

updateDecks();
renderAllDecks();

// Closing creating decks form

closeForm.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    createDeckForm.classList.add('hidden');
  });
});

decksContainer.addEventListener('click', (event) => {
    const clickedDeck = event.target.closest('.deck');
    if (!clickedDeck) return;

    const deckIndex = clickedDeck.getAttribute('data-index');
    if (deckIndex === null) return;

    localStorage.setItem('currentDeckIndex', deckIndex);

    deckSection.classList.add('hidden');
    singleDeckSection.classList.remove('hidden');

    const singleDeckName = singleDeckSection.querySelector('.single-deck-name');
    singleDeckName.textContent = decks[deckIndex].deckName;
});
