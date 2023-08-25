/**
 * This represents a single user.
 */
export type TUser = {
    username: string; // This identifies the user and needs to be unique
    displayName: string; // This is the name that is displayed to other users
    bio: string;
    avatarUrl?: string;
    socials: TUserSocials[];
    location?: string;
}

/**
 * This contains all the variants of social links that a user can have.
 */
//TODO: Maybe there is a better way to do this?
export type TUserSocialType = 'email' | 'linkedin' | 'company';
export type TUserLinklessSocialType = 'location';

/**
 * This represents a single social link of a user.
 */
export type TUserSocials = {
    type: TUserSocialType;
    label: string;
    url: string;
} | {
    type: TUserLinklessSocialType;
    label: string;
}