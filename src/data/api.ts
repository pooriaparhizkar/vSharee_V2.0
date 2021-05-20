type apiParams = string | number;
export const __APIPath = {
    verifyEmail: '/user/email-verify',
    user: {
        signup: '/user/auth/registration/',
        login: '/user/auth/login/',
        find: '/user/find/username/',
        offline: '/user/relations/offline-followings/',
        online: '/user/relations/online-followings/',
        myInfo: '/user/information/',
        detail: (username: string) => `/user/${username}/information`,
    },
    groups: {
        index: '/group/',
        top: '/group/top-groups/',
        my: '/group/joined-groups/',
    },
    profile: {
        userdata: '/user/find/username/',
        usergroup: '/group/user_groups/',
        follower: '/user/relations/followers/',
        following: '/user/relations/followings/',
        followUser: '/user/relations/follow/',
        unfollowUser: '/user/followers/unfollow/',
        konwfollow: '/user/followings/find/',
    },
};
