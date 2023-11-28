import { IconProps } from "@chakra-ui/react";
import { TProfileStatType } from "../../features/user/types/user";
import TbBooks from "../components/icons/tabler/TbBooks";
import TbEye from "../components/icons/tabler/TbEye";
import TbUserShare from "../components/icons/tabler/TbUserShare";
import TbUsers from "../components/icons/tabler/TbUsers";
import { FC } from "react";

/**
 * Icons for the profile stats
 */
export const userStatIcons: Partial<{ [key in TProfileStatType]: FC<IconProps> }> = {
    followers: TbUsers,
    following: TbUserShare,
    views: TbEye,
    posts: TbBooks
};