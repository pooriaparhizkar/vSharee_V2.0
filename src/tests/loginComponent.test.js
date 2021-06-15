import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reducer from '../redux/reducer';
import { AuthStatus } from '../interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';
import Login from '../vsharee/Login/login.index';
import userEvent from '@testing-library/user-event';

const initialState = {
    userData: null,
    authStatus: AuthStatus.isInValid,
    language: VshareeLanguage,
    isEdit: false,
    myGroups: null,
};
function renderWithRedux(
    component,
    { initialState, store = createStore(reducer, initialState), ...renderOptions } = {},
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
}

describe('Renders <Login /> component correctly', () => {
    const LANG = VshareeLanguage.Login;
    it('Renders background  correctly', () => {
        renderWithRedux(<Login />, { initialState });
        const background = screen.getByTestId('background');
        expect(background).toBeValid();
    });
    it('Renders username input correctly', () => {
        renderWithRedux(<Login />, { initialState });
        const username = screen.getByPlaceholderText(LANG.emailAddressPH);
        expect(username).toBeValid();
    });
    it('Renders password input correctly', () => {
        renderWithRedux(<Login />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password).toBeValid();
    });
    it('Change type of the password input correctly', () => {
        renderWithRedux(<Login />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password.type).toBe('password');
        const eyeIcon = screen.getByTestId('eye');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('text');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('password');
    });
    it('Change value of the password input correctly', () => {
        const tempPassword = 'Test Password';
        renderWithRedux(<Login />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password.value).toBe('');
        password.value = tempPassword;
        expect(password.value).toBe(tempPassword);
    });
    it('Change value of the input input correctly', () => {
        const tempUsername = 'Test Username';
        renderWithRedux(<Login />, { initialState });
        const username = screen.getByPlaceholderText(LANG.emailAddressPH);
        expect(username.value).toBe('');
        username.value = tempUsername;
        expect(username.value).toBe(tempUsername);
    });
    it('Render Disable status of button correctly', () => {
        renderWithRedux(<Login />, { initialState });
        const button = screen.getByRole('button');
        const username = screen.getByPlaceholderText(LANG.emailAddressPH);
        const password = screen.getByPlaceholderText(LANG.password);
        function clear() {
            userEvent.clear(username);
            userEvent.clear(password);
        }
        userEvent.type(username, '');
        userEvent.type(password, '');
        expect(button.className.includes('disable')).toBe(true);
        clear();
        userEvent.type(username, 'pouorix');
        userEvent.type(password, 'Pouorix 123');
        expect(button.className.includes('disable')).toBe(false);
        clear();
        userEvent.type(username, 'pouorix');
        userEvent.type(password, '1234');
        expect(button.className.includes('disable')).toBe(true);
        clear();
        userEvent.type(username, '$pouorix');
        userEvent.type(password, 'Pouorix 123');
        expect(button.className.includes('disable')).toBe(true);
    });
});
