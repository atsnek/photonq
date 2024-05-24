
import { proxy, arrayProxy, fnProxy, fnArrayProxy, t } from "snek-query";


export type ValuesInput = {
    emailAddress: t.String;
    username: t.String;
    password?: t.String;
    hashedPassword?: t.String;
    details?: DetailsInput;
};
export type DetailsInput = {
    firstName?: t.String;
    lastName?: t.String;
};

export class Query {
    __typename: t.String;
    getIsUnique: (args: {
        loginName: t.String;
    }) => t.NotSupportedYet;
    version: t.String;
    constructor() { this.__typename = ""; this.getIsUnique = () => null; this.version = ""; }
}
export class Mutation {
    __typename: t.String;
    userCreate: (args: {
        values: ValuesInput;
        organizationId?: t.String;
        createProfile?: t.Boolean;
        skipEmailVerification?: t.Boolean;
    }) => t.NotSupportedYet;
    constructor() { this.__typename = ""; this.userCreate = () => null; }
}

