import { VshareeLanguage } from '../vsharee/vsharee.lang';

export interface __ReduxAction<T> {
    type: string;
    payload: T;
}

export interface __ReduxState {
    userData: any;
    language: typeof VshareeLanguage;
}
