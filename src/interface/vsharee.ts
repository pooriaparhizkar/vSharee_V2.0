export interface __WorkSpace {
    created_at: string;
    id: number;
    is_default: boolean;
    title: string;
}

export interface __GroupType {
    aux_count: number;
    created_by: string;
    describtion: string;
    groupid: string;
    hash_sender: boolean;
    id: number;
    invite_only: boolean;
    members: string[];
    photo_path: true;
    privacy: number;
    since: string;
    status: number;
    title: string;
    video_hash: string;
}

export enum __Roles {
    Admin = 1,
    Publish = 2,
    Report = 4,
    Form = 3,
}
export enum __NotificationType {
    FollowRequestNumber = 1,
    GroupRequestnumber = 2,
    FollowReqyestState = 3,
    GroupReqyestState = 4,
    FollowReqyestStatus = 5,

}

