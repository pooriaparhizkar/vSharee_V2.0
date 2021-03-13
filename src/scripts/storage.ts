import { Tokens } from 'interface';

// local storage interface
export const authToken = {
    key: 'VSHAREE_AUTH_TOKEN',
    get: function (): Tokens | null {
        const data = localStorage.getItem(authToken.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value: Tokens) => {
        localStorage.setItem(authToken.key, JSON.stringify(value));
    },
    remove: () => {
        localStorage.removeItem(authToken.key);
    },
};
