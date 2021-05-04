import { VshareeLanguage } from '../vsharee/vsharee.lang';
import { __AuthStatus } from './register';
import { GroupType, UserData } from './index';

export interface __ReduxAction<T> {
    type: string;
    payload: T;
}

export interface __ReduxState {
    userData: UserData | null;
    language: typeof VshareeLanguage;
    authStatus: __AuthStatus;
    isEdit: boolean;
    myGroups: GroupType[] | undefined;
}
