import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reducer from '../redux/reducer';
import * as Actions from '../redux/actions';
import { initial_state } from '../redux/reducer';
import { AuthStatus } from '../interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';
import Dashboard from '../vsharee/Dashboard/dashboard.index';

// const mockChildComponent = jest.fn();
// jest.mock('../../utilities/components/input/input.index', () => (props) => {
//     mockChildComponent(props);
//     return <mock-childComponent />;
// });

function renderWithRedux(
    component,
    { initialState, store = createStore(reducer, initialState), ...renderOptions } = {},
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
}

describe('register reducer', () => {
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
                    firstname: 'Yazdan',
                    lastname: 'Seyyedi',
                    email: 'y@gmail.com',
                    username: 'Yazdan',
                },
            }),
        ).toEqual({
            userData: {
                firstname: 'Yazdan',
                lastname: 'Seyyedi',
                email: 'y@gmail.com',
                username: 'Yazdan',
            },
            authStatus: AuthStatus.isPending,
            language: VshareeLanguage,
            isEdit: false,
            myGroups: undefined,
        });
    });

    it('Renders <Dashboard /> component correctly', () => {
        renderWithRedux(<Dashboard />, {
            initialState: {
                language: VshareeLanguage,
                isEdit: false,
                myGroups: null,
            },
        });
        const test = screen.getByTestId('test');
        console.log(test);
    });

    // console.log(mockChildComponent.mock.calls);
    // mockChildComponent.mock.calls.map((e) => {
    //     if (e[0].label === 'نام کاربری') {
    //         expect(e[0].value).toEqual('YadanSeyyedi');
    //     } else if (e[0].label === 'نام') {
    //         expect(e[0].value).toEqual('Yazdan');
    //     } else if (e[0].label === 'نام خانوادگی') {
    //         expect(e[0].value).toEqual('Seyyedi');
    //     } else if (e[0].label === 'ایمیل') {
    //         expect(e[0].value).toEqual('y@gmail.com');
    //     }
    // });
});
