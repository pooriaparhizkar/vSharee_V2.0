type apiParams = string | number;
export const __APIPath = {
    verifyEmail: '/user/email-verify',
    user: {
        signup: '/user/auth/registration/',
        login: '/user/auth/login/',
        find: '/user/find/username/',
        offline: '/user/relations/offline_followings/',
        online: '/user/relations/online_followings/',
        myInfo: '/user/information/',
    },
    groups: {
        index: '/groups/',
        top: '/group/top_groups/',
        my: '/group/joined_groups/',
    },
    profile: {
        userdata: '/user/find/username/',
        usergroup: '/group/user_groups/',
        follower: '/user/relations/followers/',
        following: '/user/relations/followings/',
        followUser:'/user/relations/follow/',
        unfollowUser:'/user/followers/unfollow/',
        konwfollow:'/user/followings/find/'
    },
};
