import { VshareeLanguage } from '../vsharee/vsharee.lang';
import { __AuthStatus } from './register';

export interface __ReduxAction<T> {
    type: string;
    payload: T;
}

export interface __ReduxState {
    userData: any;
    language: typeof VshareeLanguage;
    authStatus: __AuthStatus;
    isEdit: boolean;
}
