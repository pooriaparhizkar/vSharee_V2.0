type routeParam = string | number;
export const __RoutePath = {
    profile: '/profile',
    profileDetail: (username: string) => `/profiles/${username}`,
    login: '/signin',
    signup: '/signup',
    dashboard: '/dashboard',
    verify: '/email-verified',
    group: (id: routeParam) => `/group/${id}`,
    landing: '/',
    setnew: (uidb: string, token: string) => `/auth/password/reset/confirm/${uidb}/${token}/`,
    directMessage: '/directMessage',
    forget: '/forgetpassword',
};
