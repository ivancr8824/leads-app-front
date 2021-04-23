import { Injectable } from "@angular/core";
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { UiViewModel } from '../viewmodels/ui.view.model';
import * as fromUiAction from '../actions/ui.action';

export const KEY_UI = 'ui';

@Injectable()
@State<UiViewModel>({
    name: KEY_UI,
    defaults: {
        loading: false,
        submit: false,
        statusResponse: {
            ok: false,
            msg: ''
        }
    }
})

export class UiState {
    constructor(){}

    @Selector()
    static statusResponse(statusResponse: UiViewModel){
        return statusResponse.statusResponse;
    }

    @Action(fromUiAction.LoadingAction)
    public Loading({ patchState}: StateContext<UiViewModel>){
        return patchState({
            loading: true
        });
    }
    

    @Action(fromUiAction.NoLoadingAction)
    public Noloading({ patchState }: StateContext<UiViewModel>){
        return patchState({
            loading: false
        });
    }

    @Action(fromUiAction.SubmitAction)
    public Submit({ patchState}: StateContext<UiViewModel>){
        return patchState({
            submit: true
        });
    }

    @Action(fromUiAction.NoSubmitAction)
    public NoSubmit({ patchState }: StateContext<UiViewModel>){
        return patchState({
            submit: false
        });
    }

    @Action(fromUiAction.StatusTransacction)
    public StatusTransacction(
        { patchState }: StateContext<UiViewModel>,
        { statusResponse }: fromUiAction.StatusTransacction
    ){
        return patchState({ statusResponse });
    }
}