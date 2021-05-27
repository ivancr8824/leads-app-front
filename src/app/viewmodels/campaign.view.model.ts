import { Campaign } from '../models/campaign.model';

interface ICampaign{
    campaigns: Campaign[]
}

export class CampaignViewModel implements ICampaign{
    public campaigns: Campaign[]

    constructor(obj: ICampaign){
        this.campaigns = (obj && obj.campaigns) || null;
    }
}