import { SYSTEM_LANG, USER_DATA } from './actions';
import { ReduxAction, ReduxState } from 'interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';

export const initial_state: ReduxState = {
    userData: null,
    language: VshareeLanguage,
};

function reducer(state: ReduxState = initial_state, action: ReduxAction<any>): ReduxState {
    switch (action.type) {
        case USER_DATA:
            return { ...state, userData: action.payload };
        case SYSTEM_LANG:
            return { ...state, language: action.payload };
        default:
            return state;
    }
}

export default reducer;
