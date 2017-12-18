import { ADD_DECK } from '../actions';

function decks (state = {}, action) {
    const { deck } = action;

    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                [deck.title]: deck
            };
        default:
            return state;
    }
};

export default decks;