import { __Pagination, __Response } from './general';
import { __ReduxAction, __ReduxState } from './redux';


import { __GroupPrivacy, __MembersInGroupType,__GroupType, __NotificationType, __Roles } from './vsharee';

import { __AuthStatus, __Tokens, __UserData } from './register';

export interface Response<D> extends __Response<D> {}
export interface Pagination<D> extends __Pagination<D> {}
export interface Tokens extends __Tokens {}
export interface ReduxAction<T> extends __ReduxAction<T> {}
export interface ReduxState extends __ReduxState {}
export interface UserData extends __UserData {}
export interface GroupType extends __GroupType {}

export interface UserData extends __UserData {}
export interface MembersInGroupType extends __MembersInGroupType {}
export { __AuthStatus as AuthStatus };

export { __NotificationType as NotificationType };

export { __GroupPrivacy as GroupPrivacy };
export { __Roles as Roles };

