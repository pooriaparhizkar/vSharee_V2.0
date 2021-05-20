import Logo from '../assets/images/landing/logo.png';
import React from 'react';

export interface __Tokens {
    access_token: string;
    refresh_token: string;
    user: { pk: string; username: string; firstname: string; lastname: string };
}

export interface __UserData {
    bio: string;
    email: string;
    firstname: string;
    groups: any[];
    is_active: boolean;
    is_admin: boolean;
    is_private: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    last_login: string;
    lastname: string;
    password: string;
    photo: boolean;
    photo_path: string;
    user_permissions: any[];
    username: string;
}

export enum __AuthStatus {
    isValid = 'isValid',
    isPending = 'isPending',
    isInValid = 'isInValid',
}
