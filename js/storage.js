export function saveDecks(decks) {
    localStorage.setItem('decks', JSON.stringify(decks));
}

export function loadDecks() {
    const stored = localStorage.getItem('decks');
    return stored ? JSON.parse(stored) : [];
}
