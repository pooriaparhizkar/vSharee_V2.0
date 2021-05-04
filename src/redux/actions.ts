import { AuthStatus, ReduxAction } from 'interface';

const USER_DATA = 'USER_DATA';
const setUserData = (payload: any): ReduxAction<any> => ({ type: USER_DATA, payload: payload });
export { USER_DATA, setUserData };

const SYSTEM_LANG = 'SYSTEM_LANG';
const setLanguage = <T>(payload: T): ReduxAction<T> => ({ type: SYSTEM_LANG, payload: payload });
export { SYSTEM_LANG, setLanguage };

const AUTH_STATUS = 'AUTH_STATUS';
const setAuth = (payload: AuthStatus): ReduxAction<AuthStatus> => ({ type: AUTH_STATUS, payload: payload });
export { AUTH_STATUS, setAuth };

const IS_EDIT = 'IS_EDIT';
const setIsEdit = (payload: any): ReduxAction<any> => ({ type: IS_EDIT, payload: payload });
export { IS_EDIT, setIsEdit };

const MY_GROUPS = 'MY_GROUPS';
const setMyGroups = (payload: any): ReduxAction<any> => ({ type: MY_GROUPS, payload: payload });
export { MY_GROUPS, setMyGroups };
