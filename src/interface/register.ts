export interface __Tokens {
    access: string;
    expire_date: string;
    refresh: string;
}

export interface __UserData {
    username: string;
}
export enum __AuthStatus {
    isValid = 'valid',
    isPending = 'pending',
    isInValid = 'inValid',
}
