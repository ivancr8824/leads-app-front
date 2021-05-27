export interface Campaign {
    Id: number,
    Name: string
}

export interface ResponseCampaign {
    ok: boolean,
    result: Campaign[]
}

export interface ResponseSendingEmailCampaign{
    ok: boolean,
    msg: string
}