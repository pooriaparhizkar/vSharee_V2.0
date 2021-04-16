import ENV from 'env.json';
type apiParams = string | number;

export const __APIPath = {
    verifyEmail: '/user/email-verify',
    user: {
        signup: '/user/signup/',
        login: '/user/login/',
    },
};
