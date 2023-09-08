import { StateCreator } from "zustand";
import { PostSlice } from "../../post/store/postSlice";
import { TUser } from "../types/user";


// export interface UserSlice {
//     user?: TUser;
// }

// export const createUserSlice: StateCreator<PostSlice & UserSlice, [["zustand/devtools", never]], [], UserSlice> = (set) => ({
//     user: undefined,
// })