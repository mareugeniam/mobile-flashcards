import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY';

export function fetchDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => JSON.parse(results));
};

export function submitDecks (decks) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
};