type routeParam = string | number;
export const __RoutePath = {
    profile: '/profile',
    profileDetail: (username: string) => `/profiles/${username}`,
    login: '/signin',
    signup: '/signup',
    dashboard: '/dashboard',
    verify: '/email-verified',
    landing: '/',
};
