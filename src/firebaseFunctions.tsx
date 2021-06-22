import firebase from 'firebase';

export const login = () => {
    firebase.analytics().logEvent('LoginEvent');
};
export const signup = () => {
    firebase.analytics().logEvent('SignupEvent');
};
export const creategroup = () => {
    firebase.analytics().logEvent('creategroup');
};
