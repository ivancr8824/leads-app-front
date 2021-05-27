import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { CampaignService } from "../services/campaign.service";
import * as fromCampaign from '../actions/campaign.action';
import { CampaignViewModel } from '../viewmodels/campaign.view.model';
import { tap } from "rxjs/operators";
import { LoadingAction, NoLoadingAction } from '../actions/ui.action';
import Swal from 'sweetalert2';

export const KEY_CAMPAIGN = 'campaing';

@Injectable()
@State<CampaignViewModel>({
    name: KEY_CAMPAIGN,
    defaults: {
        campaigns: null
    }
})

export class CampaingState {
    constructor(
        private campaignService: CampaignService
    ){}

    @Action(fromCampaign.ObtainCampaignAction)
    public ObtainCampaigns(
        { patchState }: StateContext<CampaignViewModel>
    ){
        return this.campaignService.getInformationCampaigns()
            .pipe(
                tap((response) => {
                    return patchState({
                        campaigns: response.result
                    })
                })
            );
    }

    @Action(fromCampaign.SendCampaignAction)
    public SendEmailCampaign(
        { dispatch }: StateContext<CampaignViewModel>,
        { campaignSelected, emails }: fromCampaign.SendCampaignAction
    ){
        dispatch(new LoadingAction());
        return this.campaignService.sendEmails(campaignSelected, emails)
            .pipe(
                tap((response) => {
                    Swal.fire({
                        title: (response.ok) ? 'Envio Correcto' : 'Error',
                        text: response.msg,
                        icon: (response.ok) ? 'success' : 'error'
                    });
                    dispatch(new NoLoadingAction());
                })
            );
    }
}
