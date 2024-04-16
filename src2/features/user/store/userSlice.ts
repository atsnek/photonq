import { produce } from 'immer';
import { sq } from '@snek-functions/origin';
import { TStoreSlice } from '../../../shared/types/store';
import { TUserSlice } from '../types/userState';

export const createUserSlice: TStoreSlice<TUserSlice> = set => ({
  userMe: null,
  fetchUser: async () => {
    const [snekUser, error] = await sq.query(q => q.userMe);

    if (error || !snekUser) return;

    set(
      produce((state: any) => {
        console.log('state:', state);
        console.log('logged in snek user: ', snekUser);
        state.currentUser.userMe = snekUser;
      })
    );
  }
});
