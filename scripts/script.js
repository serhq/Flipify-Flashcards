let currentIndex = 0;

// word - definition
const wordFlashcard = document.querySelector('.word-flashcard');
const definitionFlashcard = document.querySelector('.definition-flashcard');
const addFlashcardBtn = document.querySelector('.add-form-btn');

// opening/closing forms
const addForm = document.querySelector('.add-form');
const removeForm = document.querySelector('.remove-form');
const closeForm = document.querySelector('.close-form');
const overlay = document.querySelector('.overlay');

// actions with flashcard (buttons to open forms)
const flashcard = document.getElementById('flashcard');
const addFlashcard = document.querySelector('.add-flashcard');
const addFlashcardExtra = document.querySelector('.add-flashcard-extra')
const removeFlashcard = document.querySelector('.remove-flashcard');

// switching between flashcards
const nextFlashcard = document.querySelector('.next-flashcard');
const previousFlashcard = document.querySelector('.previous-flashcard');

// deleting the current flashcard
const acceptDeletion = document.querySelector('.confirm-deletion-btn');
const discardDeletion = document.querySelector('.discard-deletion-btn');

// displaying notification if there's any issue.
const showNotification = (heading, description) => {
    document.querySelector('.notification').classList.remove('hidden');
    document.querySelector('.notification-heading').textContent = heading;
    document.querySelector('.notification-description').textContent = description;

    document.querySelector('.close-notification').addEventListener('click', () => {
        document.querySelector('.notification').classList.add('hidden');
    })

    setTimeout(() => {
        document.querySelector('.notification').classList.add('hidden');
        document.querySelector('.notification-heading').textContent = '';
        document.querySelector('.notification-description').textContent = '';
    }, 5000);
}

// flip the flashcard if requested
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// empty list of flashcards
let flashcards = [];

// Function to load flashcards from localStorage
const loadFlashcards = () => {
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
        flashcards = JSON.parse(storedFlashcards);
        currentIndex = 0;
        updateFlashcard();
    }
};

// Function to save flashcards to localStorage
const saveFlashcards = () => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
};

const updateFlashcard = () => {
    if (flashcards.length === 0 || currentIndex < 0 || currentIndex >= flashcards.length) {
        wordFlashcard.textContent = '';
        definitionFlashcard.textContent = '';
        document.querySelector('.flashcards-amount').textContent = `0/0`;
        return;
    }
    wordFlashcard.textContent = flashcards[currentIndex].word;
    definitionFlashcard.textContent = flashcards[currentIndex].definition;

    document.querySelector('.flashcards-amount').textContent = `${currentIndex+1}/${flashcards.length}`;
};

// previous flashcard button <=
previousFlashcard.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = flashcards.length - 1; // Go to the last card if at the beginning
        if (flashcards.length === 0) {
            showNotification(`Something's up! ⚠️`, `There's no any flashcards to switch between.`);
            currentIndex = 0;
        }
    }
    
    flashcard.classList.remove('flipped');
    
    document.querySelector('.flashcards-amount').textContent = `${currentIndex+1}/${flashcards.length}`;
    updateFlashcard();
});

// next flashcard button =>
nextFlashcard.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= flashcards.length) {
        currentIndex = 0; // Go back to the first card if at the end
        if (flashcards.length === 0) {
            showNotification(`Something's up! ⚠️`, `There's no any flashcards to switch between.`);
        }
    }

    flashcard.classList.remove('flipped');

    document.querySelector('.flashcards-amount').textContent = `${currentIndex+1}/${flashcards.length}`;
    updateFlashcard();
});


// show flashcards if they're added
const renderAllFlashcards = () => {

    const noFlashcards = document.querySelector('.no-flashcards-msg');
    const listContainer = document.querySelector('.all-flashcards-list');
    listContainer.innerHTML = '';

    if (flashcards.length === 0) {
        noFlashcards.classList.remove('hidden');
        return;
    } else {
        noFlashcards.classList.add('hidden');
    }
    for (let i = 0; i < flashcards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card-preview');
        
        const wordElement = document.createElement('h3');
        wordElement.textContent = flashcards[i].word;

        const definitionElement = document.createElement('p');
        definitionElement.textContent = flashcards[i].definition;

        card.appendChild(wordElement);
        card.appendChild(definitionElement);

        listContainer.appendChild(card);
    }
}

// add new flashcard
addFlashcard.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    addForm.classList.remove('hidden');
});

addFlashcardExtra.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    addForm.classList.remove('hidden');
})

addFlashcardBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const wordInput = document.getElementById('word').value.trim();
    const definitionInput = document.getElementById('definition').value.trim();

    if (wordInput !== '' && definitionInput !== '') {
        const isDuplicate = flashcards.some(card => card.word.toLowerCase() == wordInput.toLowerCase());

        if (isDuplicate) {
            showNotification(`Duplicate word ⚠️`, `A flashcard with the word "${wordInput}" already exists.`);
            return;
        }

        flashcards.push({word: wordInput, definition: definitionInput });
        saveFlashcards(); // Save to localStorage

        currentIndex = flashcards.length - 1;
        updateFlashcard();

        addForm.classList.add('hidden');
        overlay.classList.add('hidden');

        document.getElementById('word').value = '';
        document.getElementById('definition').value = '';

        showNotification('Successful! ✅', 'The flashcard was added.');
        renderAllFlashcards();

    } else if (wordInput !== '' && definitionInput == '') {
        showNotification(`Definition is empty! ⚠️`, `You can't create an empty flashcard. Make sure the definition is entered.`);
        return;
    } else if (wordInput == '' && definitionInput !== '') {
        showNotification(`Word is empty! ⚠️`, `You can't create an empty flashcard. Make sure the word is entered.`);
        return;
    } else {
        showNotification(`Something's up! ⚠️`, `You can't add the empty flashcard. Make sure it has word and description!`);
    }

});

// close form
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !addForm.classList.contains('hidden')) {
        addForm.classList.add('hidden');
        overlay.classList.add('hidden');
    }
});

closeForm.addEventListener('click', () => {
    addForm.classList.add('hidden');
    overlay.classList.add('hidden');
})

overlay.addEventListener('click', () => {
    addForm.classList.add('hidden');
    removeForm.classList.add('hidden');
    overlay.classList.add('hidden');
})

// remove the current flashcard form visible
removeFlashcard.addEventListener('click', () => {
    if (flashcards.length > 0) {
        removeForm.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else {
        showNotification(`Something's up! ⚠️`, `There's no any flashcards to remove.`);
    }
});

acceptDeletion.addEventListener('click', (e) => {
    e.preventDefault();
    flashcards.splice(currentIndex, 1);
    saveFlashcards(); // Save to localStorage

    if (currentIndex >= flashcards.length) {
        currentIndex = flashcards.length - 1;
    }

    removeForm.classList.add('hidden');
    overlay.classList.add('hidden');

    showNotification('Successful! ✅', 'The flashcard was removed.');

    updateFlashcard();
    renderAllFlashcards();
});

discardDeletion.addEventListener('click', (e) => {
    e.preventDefault(); // do not reload the page after submittion the form (clicking the button)
    removeForm.classList.add('hidden');
    overlay.classList.add('hidden');

});

// Load flashcards on initialization
loadFlashcards();
updateFlashcard();
renderAllFlashcards();
