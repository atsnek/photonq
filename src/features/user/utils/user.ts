import { SnekUser } from "@atsnek/jaen"
import { TUser } from "../types/user";
import { sq } from "@snek-functions/origin";

/**
 * Returns the display name of a user
 * @param user The user to get the display name of
 * @returns The display name of the user
 * @example getDisplayname({ username: "test", details: { firstName: "Test", lastName: "User" } }) // "Test User"
 * @example getDisplayname({ username: "test", details: { firstName: "Test" } }) // "Test"
 * @example getDisplayname({ username: "test", details: { lastName: "User" } }) // "User"
 * @example getDisplayname({ username: "test" }) // "test"
 */
export const getUserDisplayname = (user: SnekUser) => {
    let displayName: string | undefined = undefined;
    if (user.details?.firstName) {
        displayName = user.details.firstName;
    }
    if (user.details?.lastName) {
        if (displayName) displayName += ` ${user.details.lastName}`;
        else displayName = user.details.lastName;
    }

    if (!displayName) {
        displayName = user.username;
    }
    return displayName;
}

/**
 * Fetches a user profile from the database
 * @param profileId The id of the profile to fetch
 * @returns The profile data of the user
 */
export const fetchProfile = async (profileId: string): Promise<TUser | undefined> => {
    const [user, error] = await sq.query((q): TUser => {
        //TODO: Re-enable this once the backend is ready again
        // const user = q.socialProfile({ profileId });

        //TODO: Replace this with actual data as soon as it's available
        return {
            username: 'emilybrooks',
            bio: 'Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let\'s dive into the realm of information together uncover the wonders of education.',
            displayName: 'Emily Brooks',
            avatarUrl: 'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
            socials: []
        }
    })

    return (error) ? undefined : user;
}