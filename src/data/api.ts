type apiParams = string | number;
export const __APIPath = {
    baseurl: '/',
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
    forgetPass: {
        forget: '/user/auth/password-reset/',
    },
    groups: {
        index: '/group/',
        top: '/group/top-groups/',
        my: '/group/joined-groups/',
        uploadPhoto: (id: apiParams) => `/group/upload-photo/?groupid=${id}`,
        getPhoto: (id: apiParams) => `/group/${id}/get-photo-path/`,
        detail: (id: apiParams) => `/group/detail/${id}/`,
        join: '/group/join/',
        permissions: (id: apiParams, member: string) => `/group/${id}/permissions/?member=${member}`,
        preview: (id: apiParams) => `/group/preview/?group=${id}`,
        invite: '/group/invite/',
        notifyMembers: `/group/set-notice/`,
    },
    profile: {
        userdata: '/user/find/username/',
        usergroup: '/group/user-groups/',
        follower: '/user/relations/followers/',
        following: '/user/relations/followings/',
        followUser: '/user/relations/follow/',
        unfollowUser: '/user/followers/unfollow/',
        konwfollow: '/user/followings/find/',
        upload_photo: (username: string) => `/user/${username}/edit-profile/upload-photo/`,
        edit_profile: (username: string) => `/user/${username}/edit-profile/`,
    },
    notification: {
        index: '/notifications/',
        followReq: '/user/relations/follow-requests/',
        groupnotice: '/notifications/groups-notice-list/',
        acceotordecline: (id: any, type: string) => `/user/relations/request/?state=${type}&userid=${id}`,
        ivitelist:'/group/invite-list/'
        
    },
};
