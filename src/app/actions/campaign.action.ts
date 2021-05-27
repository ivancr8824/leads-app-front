
export class ObtainCampaignAction {
    static readonly type = '[Campaign] Obtener Campañas'
    constructor(){}
}

export class SendCampaignAction {
    static readonly type = '[Campaign] Enviar Emails Campaña'
    constructor(public campaignSelected: number, public emails: string[]){}
}