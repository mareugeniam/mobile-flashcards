import { DECKS_STORAGE_KEY, fetchDecks, submitDecks } from './api';
import { addDeck } from '../actions/index';
import { store } from './configureStore';

export const getDecks = () => {
    return (dispatch) => {
        return fetchDecks().then((decks) => {
            decks && Object.keys(decks).map(deck => {
                dispatch(addDeck(decks[deck]))
            })
        })
    }
}

export function saveDecks() {
    submitDecks(store.getState());
};

export function createDeck(title, questions=[]) {
    return {
        title: title,
        questions: questions
    };
};

export function addCardToDeck(card, deck) {
    const updatedQuestions = [...deck.questions, card];
    return createDeck(deck.title, updatedQuestions);
};

export function createNewCard (question, answer) {
    return {
        question: question,
        answer: answer
    };
};

