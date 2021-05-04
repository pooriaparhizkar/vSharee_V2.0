import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { authToken } from '../scripts/storage';
import { setAuth, setMyGroups, setUserData } from '../redux/actions';
import { AuthStatus, GroupType, UserData } from '../interface';
import { get, responseValidator } from '../scripts/api';
import { APIPath } from '../data';
import { toast } from 'react-toastify';

export const vShareeInitialize = (dispatch: Dispatch<AnyAction>) => {
    getUser(dispatch);
    getMyGroups(dispatch);
};
export const getMyGroups = (dispatch: Dispatch<AnyAction>) => {
    if (authToken.get()) {
        dispatch(setMyGroups(undefined));
        get<GroupType[]>(APIPath.groups.my).then((result) => {
            if (responseValidator(result.status) && result.data) {
                dispatch(setMyGroups(result.data));
            } else {
                // toast.error('Something went wrong ');
            }
        });
    }
};

const getUser = (dispatch: Dispatch<AnyAction>) => {
    if (!authToken.get()) {
        dispatch(setAuth(AuthStatus.isInValid));
    } else {
        get<UserData[]>(APIPath.user.myInfo).then((res) => {
            if (responseValidator(res.status) && res.data) {
                dispatch(setUserData(res.data[0]));
                dispatch(setAuth(AuthStatus.isValid));
            } else {
                authToken.remove();
                dispatch(setAuth(AuthStatus.isInValid));
            }
        });
    }
};
