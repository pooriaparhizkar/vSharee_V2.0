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
    photo: true;
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
