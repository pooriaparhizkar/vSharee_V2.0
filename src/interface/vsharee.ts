export interface __GroupType {
    aux_count: number;
    created_by: string;
    describtion: string;
    groupid: string;
    hash_sender: boolean;
    id: number;
    invite_only: boolean;
    members: string[];
    photo_path: string;
    privacy: number;
    since: string;
    status: number;
    title: string;
    photo: boolean;
    video_hash: string;
}
export interface __MembersInGroupType {
    chat_permission: boolean;
    choose_video_permission: boolean;
    date_set: string;
    group: string;
    id: number;
    member: string;
    playback_permission: boolean;
}

export enum __Roles {
    Owner = 1,
    Selector = 2,
    Controller = 3,
    Mute = 4,
    Viewer = 5,
}
export enum __GroupPrivacy {
    public = 0,
    semiPrivate = 1,
    private = 2,
}
