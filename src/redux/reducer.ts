import { AUTH_STATUS, SYSTEM_LANG, USER_DATA } from './actions';
import { AuthStatus, ReduxAction, ReduxState } from 'interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';

export const initial_state: ReduxState = {
    userData: null,
    language: VshareeLanguage,
    authStatus: AuthStatus.pending,
};

function reducer(state: ReduxState = initial_state, action: ReduxAction<any>): ReduxState {
    switch (action.type) {
        case USER_DATA:
            return { ...state, userData: action.payload };
        case SYSTEM_LANG:
            return { ...state, language: action.payload };
        case AUTH_STATUS:
            return { ...state, authStatus: action.payload };
        default:
            return state;
    }
}

export default reducer;
