
import { proxy, arrayProxy, fnProxy, fnArrayProxy, t } from "snek-query";

export enum COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK {
    completed = "completed",
    waiting = "waiting",
    active = "active",
    delayed = "delayed",
    failed = "failed",
    paused = "paused",
    stuck = "stuck"
}


export class Query {
    __typename: t.String;
    translate: (args: {
        taskId: t.String;
    }) => Translate;
    version: t.String;
    constructor() { this.__typename = ""; this.translate = fnProxy(Translate); this.version = ""; }
}
export class Translate {
    __typename: t.String;
    id: t.String;
    status: t.Nullable<COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK>;
    progress: JobData;
    data: JobData;
    constructor() { this.__typename = ""; this.id = ""; this.status = null; this.progress = proxy(JobData); this.data = proxy(JobData); }
}
export class JobData {
    __typename: t.String;
    base64Qasm: t.String;
    result: t.Nullable<Result>;
    constructor() { this.__typename = ""; this.base64Qasm = ""; this.result = proxy(Result); }
}
export class Result {
    __typename: t.String;
    errors: t.String[];
    warnings: t.String[];
    translation: Translation[];
    constructor() { this.__typename = ""; this.errors = []; this.warnings = []; this.translation = arrayProxy(Translation); }
}
export class Translation {
    __typename: t.String;
    mimeType: t.String;
    value: t.String;
    dataUri: t.String;
    name: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.mimeType = ""; this.value = ""; this.dataUri = ""; this.name = null; }
}
export class Mutation {
    __typename: t.String;
    translate: (args: {
        base64Code: t.String;
    }) => Translate;
    constructor() { this.__typename = ""; this.translate = fnProxy(Translate); }
}

