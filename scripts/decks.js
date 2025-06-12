import { 
    decksContainer, 
    decksStatus,
    createDeckForm,
    createDeckFormBtn,
    createDeckBtn,
} from "./dom.js";

let decks = [];

// Updating decks

const updateDecks = () => {
    if (decks.length === 0) {
        decksStatus.innerHTML = 'You do not have any decks yet. <br>To create your first deck, please click the "+" button.';
        return;
    } else {
        decksStatus.innerHTML = 'Great! Your flashcard decks are ready. <br>Select one to begin learning or add more to expand your collection.';
        return;
    }
};

// Creating docks

createDeckBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    createDeckForm.classList.remove('hidden');
});

createDeckFormBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    let deckTitle = document.getElementById('deck-name').value.trim();
    let deckSubtitle = document.getElementById('deck-description').value.trim();

    if (deckTitle !== '') {
        decks.push({ deckName: deckTitle, deckDescription: deckSubtitle });

        overlay.classList.add('hidden');
        createDeckForm.classList.add('hidden');

        updateDecks();
    }

});

updateDecks();