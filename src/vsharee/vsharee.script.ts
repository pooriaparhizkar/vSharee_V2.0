import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { authToken } from '../scripts/storage';
import { VshareeLanguage } from './vsharee.lang';
import { setAuth } from '../redux/actions';
import { AuthStatus } from '../interface';

export const vShareeInitialize = (dispatch: Dispatch<AnyAction>) => {
    getUser(dispatch);
};

const getUser = (dispatch: Dispatch<AnyAction>) => {
    if (!authToken.get()) {
        dispatch(setAuth(AuthStatus.inValid));
    } else {
        // get<UserData>(API.profile).then((res) => {
        //  if (responseValidator(res) && res.data) {
        //    dispatch(setUserData(res.data));
        dispatch(setAuth(AuthStatus.valid));
        //    getWorkSpaces(dispatch, lang);
        // } else {
        //    authToken.remove();
        //    dispatch(setAuth(AuthStatus.inValid));
    }
    // });
    // }
};
