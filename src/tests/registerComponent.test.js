import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reducer from '../redux/reducer';
import { AuthStatus } from '../interface';
import { VshareeLanguage } from '../vsharee/vsharee.lang';
import userEvent from '@testing-library/user-event';
import Signup from '../vsharee/Sign up/signup.index';

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

describe('Renders <Signup /> component correctly', () => {
    const LANG = VshareeLanguage.Signup;
    it('Renders background  correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const background = screen.getByTestId('background');
        expect(background).toBeValid();
    });
    it('Renders username input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const username = screen.getByPlaceholderText(LANG.username);
        expect(username).toBeValid();
    });
    it('Renders email input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const username = screen.getByPlaceholderText(LANG.email);
        expect(username).toBeValid();
    });
    it('Renders password input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password).toBeValid();
    });
    it('Renders confirm password input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.confirmPassword);
        expect(password).toBeValid();
    });
    it('Change type of the password input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password.type).toBe('password');
        const eyeIcon = screen.getByTestId('eye');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('text');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('password');
    });
    it('Change type of the confirm password input correctly', () => {
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.confirmPassword);
        expect(password.type).toBe('password');
        const eyeIcon = screen.getByTestId('eye2');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('text');
        userEvent.click(eyeIcon);
        expect(password.type).toBe('password');
    });
    it('Change value of the password input correctly', () => {
        const tempPassword = 'Test Password';
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.password);
        expect(password.value).toBe('');
        password.value = tempPassword;
        expect(password.value).toBe(tempPassword);
    });
    it('Change value of the confirm password input correctly', () => {
        const tempPassword = 'Test Password';
        renderWithRedux(<Signup />, { initialState });
        const password = screen.getByPlaceholderText(LANG.confirmPassword);
        expect(password.value).toBe('');
        password.value = tempPassword;
        expect(password.value).toBe(tempPassword);
    });
    it('Change value of the email input correctly', () => {
        const tempPassword = 'Test Password';
        renderWithRedux(<Signup />, { initialState });
        const email = screen.getByPlaceholderText(LANG.email);
        expect(email.value).toBe('');
        email.value = tempPassword;
        expect(email.value).toBe(tempPassword);
    });
    it('Change value of the username input correctly', () => {
        const tempUsername = 'Test Username';
        renderWithRedux(<Signup />, { initialState });
        const username = screen.getByPlaceholderText(LANG.username);
        expect(username.value).toBe('');
        username.value = tempUsername;
        expect(username.value).toBe(tempUsername);
    });
    // it('Render Disable status of button correctly', () => {
    //     renderWithRedux(<Signup />, { initialState });
    //     const button = screen.getByRole('button');
    //     const iusername = screen.getByPlaceholderText(LANG.username);
    //     const iemail = screen.getByPlaceholderText(LANG.email);
    //     const ipassword = screen.getByPlaceholderText(LANG.password);
    //     const iconfirmPassword = screen.getByPlaceholderText(LANG.confirmPassword);
    //
    //     function clear() {
    //         userEvent.clear(iusername);
    //         userEvent.clear(ipassword);
    //         userEvent.clear(iconfirmPassword);
    //         userEvent.clear(iemail);
    //     }
    //     function fill(username, email, password, confirmPassword) {
    //         userEvent.type(iusername, username, { delay: 1000 }).then(() => {
    //             userEvent.type(ipassword, password);
    //             userEvent.type(iemail, email);
    //             userEvent.type(iconfirmPassword, confirmPassword);
    //         });
    //     }
    //     fill('', '', '', '');
    //     expect(button.className.includes('disable')).toBe(true);
    //     clear();
    //     fill('tempUsername', 'tempEmail@gmail.com', 'Pouorix 123', 'Pouorix 123');
    //     expect(button.className.includes('disable')).toBe(false);
    // });
});
