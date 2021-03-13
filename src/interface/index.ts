import { __Pagination, __Response } from './general';
import { __ReduxAction, __ReduxState } from './redux';
import { __Tokens } from './register';
import { __Roles, __WorkSpace } from './vsharee';

export interface Response<D> extends __Response<D> {}
export interface Pagination<D> extends __Pagination<D> {}
export interface Tokens extends __Tokens {}
export interface ReduxAction<T> extends __ReduxAction<T> {}
export interface ReduxState extends __ReduxState {}
export interface WorkSpace extends __WorkSpace {}
export { __Roles as Roles };
