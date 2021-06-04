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
    photo_path: string;
    privacy: number;
    since: string;
    status: number;
    title: string;
    photo: boolean;
    video_hash: string;
}

export enum __Roles {
    Admin = 1,
    Publish = 2,
    Report = 4,
    Form = 3,
}
export enum __GroupPrivacy {
    public = 0,
    semiPrivate = 1,
    private = 2,
}
