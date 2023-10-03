import { SnekUser } from '@atsnek/jaen';

export interface IUserStateDefinition {
  userMe: SnekUser | null;
}

export interface IUserStateActions {
  fetchUser: () => void;
}

export type TUserSlice = IUserStateDefinition & IUserStateActions;
