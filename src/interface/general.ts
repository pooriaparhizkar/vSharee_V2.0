import { strict } from 'assert';

export interface __Response<D> {
    status: number;
    data: D;
}

export interface __Pagination<D> {
    count: number;
    data: D[];
    num_of_pages: number;
}
