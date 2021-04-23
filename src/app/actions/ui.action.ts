import { IStatusResponse } from "../models/statusResponse.model"

export class LoadingAction {
    static readonly type = '[ui] Cargando'
}

export class NoLoadingAction {
    static readonly type = '[ui] No Cargando'
}

export class SubmitAction {
    static readonly type = '[ui] Submit'
}

export class NoSubmitAction {
    static readonly type = '[ui] No Submit'
}

export class StatusTransacction {
    static readonly type = '[ui] Estado de transaccion'
    constructor(public statusResponse: IStatusResponse){}
}

