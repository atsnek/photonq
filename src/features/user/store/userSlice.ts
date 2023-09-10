import { StateCreator } from "zustand";
import { SnekUser } from "@atsnek/jaen";
import { produce } from "immer";
import { sq } from "@snek-functions/origin";
import { TStoreSlices } from "../../../shared/store/store";


export interface UserSlice {
    userMe: SnekUser | null;
    fetchUser: () => void;
}

export const createUserSlice: StateCreator<TStoreSlices, [["zustand/devtools", never]], [], UserSlice> = (set) => ({
    userMe: null,
    fetchUser: async () => {
        const [snekUser, error] = await sq.query(q => q.userMe);

        if (error || !snekUser) return;

        set(produce(state => {
            console.log("logged in snek user: ", snekUser)
            state.userMe = snekUser
        }));
    },
})