
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
export enum TRANSLATION_SIMULATION {
    translation = "translation",
    simulation = "simulation"
}


export class Query {
    __typename: t.String;
    execution: (args: {
        taskId: t.String;
    }) => Execution;
    version: t.String;
    constructor() { this.__typename = ""; this.execution = fnProxy(Execution); this.version = ""; }
}
export class Execution {
    __typename: t.String;
    id: t.String;
    status: t.Nullable<COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK>;
    progress: JobData;
    data: JobData;
    constructor() { this.__typename = ""; this.id = ""; this.status = null; this.progress = proxy(JobData); this.data = proxy(JobData); }
}
export class JobData {
    __typename: t.String;
    type: t.Nullable<TRANSLATION_SIMULATION>;
    base64Qasm: t.String;
    result: t.Nullable<Result>;
    constructor() { this.__typename = ""; this.type = null; this.base64Qasm = ""; this.result = proxy(Result); }
}
export class Result {
    __typename: t.String;
    errors: t.String[];
    warnings: t.String[];
    infos: t.String[];
    data: Data[];
    constructor() { this.__typename = ""; this.errors = []; this.warnings = []; this.infos = []; this.data = arrayProxy(Data); }
}
export class Data {
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
    }) => Execution;
    simulate: (args: {
        base64Code: t.String;
    }) => Execution;
    constructor() { this.__typename = ""; this.translate = fnProxy(Execution); this.simulate = fnProxy(Execution); }
}

