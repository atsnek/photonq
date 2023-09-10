import { StateCreator } from "zustand";
import { PostSlice } from "../../post/store/postSlice";
import { TUser } from "../types/user";
import { SnekUser } from "@atsnek/jaen";
import { ProfileSlice } from "./profileSlice";
import { produce } from "immer";
import { sq } from "@snek-functions/origin";
import { TStoreSlices } from "../../../shared/store/store";


export interface UserSlice {
    user: SnekUser | null;
    fetchUser: () => void;
}

export const createUserSlice: StateCreator<TStoreSlices, [["zustand/devtools", never]], [], UserSlice> = (set) => ({
    user: null,
    fetchUser: async () => {
        const [snekUser, error] = await sq.query(q => q.userMe);

        if (error || !snekUser) {
            console.log("userslice: No current user found");
            return;
        }
        console.log("logged in user: ", snekUser);
        set(produce(state => state.user = snekUser));
    },
})