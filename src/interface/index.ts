import { __Pagination, __Response } from './general';
import { __ReduxAction, __ReduxState } from './redux';

import { __GroupType, __Roles, __WorkSpace } from './vsharee';
import { __AuthStatus, __Tokens, __UserData } from './register';

export interface Response<D> extends __Response<D> {}
export interface Pagination<D> extends __Pagination<D> {}
export interface Tokens extends __Tokens {}
export interface ReduxAction<T> extends __ReduxAction<T> {}
export interface ReduxState extends __ReduxState {}
export interface UserData extends __UserData {}
export interface WorkSpace extends __WorkSpace {}
export interface GroupType extends __GroupType {}
export interface UserData extends __UserData {}

export { __AuthStatus as AuthStatus };
