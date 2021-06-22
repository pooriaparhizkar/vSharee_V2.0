import React from 'react';
import '@testing-library/jest-dom';
import reducer from '../redux/reducer';
import * as Actions from '../redux/actions';
import { initial_state } from '../redux/reducer';
import { AuthStatus } from '../interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';
describe('Renders Reducer correctly', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            userData: null,
            authStatus: AuthStatus.isPending,
            language: VshareeLanguage,
            isEdit: false,
            myGroups: undefined,
        });
    });
    it('should handle USER_DATA', () => {
        expect(
            reducer(initial_state, {
                type: Actions.USER_DATA,
                payload: {
                    firstname: 'Pooria',
                    lastname: 'Parhizkar',
                    email: 'pouorix@gmail.com',
                    username: 'pouorix',
                },
            }),
        ).toEqual({
            userData: {
                firstname: 'Pooria',
                lastname: 'Parhizkar',
                email: 'pouorix@gmail.com',
                username: 'pouorix',
            },
            authStatus: AuthStatus.isPending,
            language: VshareeLanguage,
            isEdit: false,
            myGroups: undefined,
        });
    });
    it('should handle authStatus', () => {
        expect(
            reducer(initial_state, {
                type: Actions.AUTH_STATUS,
                payload: AuthStatus.isValid,
            }),
        ).toEqual({
            userData: null,
            authStatus: AuthStatus.isValid,
            language: VshareeLanguage,
            isEdit: false,
            myGroups: undefined,
        });
    });
});
