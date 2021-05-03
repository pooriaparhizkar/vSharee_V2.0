import { __Pagination, __Response } from './general';
import { __ReduxAction, __ReduxState } from './redux';
import { __AuthStatus, __Tokens, __UserData } from './register';
import { __Roles, __WorkSpace } from './vsharee';

export interface Response<D> extends __Response<D> {}
export interface Pagination<D> extends __Pagination<D> {}
export interface Tokens extends __Tokens {}
export interface ReduxAction<T> extends __ReduxAction<T> {}
export interface ReduxState extends __ReduxState {}
export interface UserData extends __UserData {}
export interface WorkSpace extends __WorkSpace {}
export { __AuthStatus as AuthStatus };
export { __Roles as Roles };
