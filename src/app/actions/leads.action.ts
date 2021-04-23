import { Lead } from '../models/lead.model';

export class ListLeadsAction {
    static readonly type = '[Lead] Obtener Leads'
    constructor(public page: number = 1, public limit: number = 5){}
}

export class SearchLeadsAction {
    static readonly type = '[Lead] Buscar Leads'
    constructor(public termino: string, public page: number, public limit: number){}
}

export class ListLeadsExcelAction {
    static readonly type = '[Lead] Obtener Leads para excel'
}

export class AddLeadAction {
    static readonly type = '[Lead] Agregar Lead'
    constructor(public lead: Lead){}
}

export class UpdateLeadAction {
    static readonly type = '[Lead] Update Lead'
    constructor(public lead: Lead){}
}

export class DeleteLeadAction {
    static readonly type = '[Lead] Delete Lead'
    constructor(public id: number){}
}