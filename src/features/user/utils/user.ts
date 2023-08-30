import { SnekUser } from "@atsnek/jaen"

/**
 * Returns the display name of a user
 * @param user The user to get the display name of
 * @returns The display name of the user
 * @example getDisplayname({ username: "test", details: { firstName: "Test", lastName: "User" } }) // "Test User"
 * @example getDisplayname({ username: "test", details: { firstName: "Test" } }) // "Test"
 * @example getDisplayname({ username: "test", details: { lastName: "User" } }) // "User"
 * @example getDisplayname({ username: "test" }) // "test"
 */
const getUserDisplayname = (user: SnekUser) => {
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

export { getUserDisplayname };