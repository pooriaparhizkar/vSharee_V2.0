import ENV from 'env.json';
type apiParams = string | number;

export const __APIPath = {
    verifyEmail: '/user/email-verify',
    user: {
        signup: '/user/auth/registration/',
        login: '/user/auth/login/',
        find: '/user/find/username/',
    },
    groups: {
        index: '/groups/',
    },
};
