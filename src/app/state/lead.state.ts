import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, tap } from 'rxjs/operators';
import { LeadViewModel } from "../viewmodels/lead.view.model";
import * as fromLeadAction from '../actions/leads.action';
import * as fromUiAction from "../actions/ui.action";
import { LeadsService } from '../services/leads.service';
import { IStatusResponse } from '../models/statusResponse.model';

export const KEY_LEADS = 'leads';

@Injectable()
@State<LeadViewModel>({
    name: KEY_LEADS,
    defaults: {
        leads: null,
        pages: null,
        totalRegisters: 0,
        leadsForExcel: [],
        searchText: ''
    }
})

export class LeadState {
    constructor(
        private leadService: LeadsService
    ){}

    @Selector()
    static totalRegisters(totalRegisters: LeadViewModel){
        return totalRegisters.totalRegisters;
    }

    @Selector()
    static registerExportExcel(registers: LeadViewModel){
        return registers.leadsForExcel;
    }

    @Selector()
    static searchText(text: LeadViewModel){
        return text.searchText;
    }

    @Action(fromLeadAction.ListLeadsAction)
    public GetLeadsInformation(
        { patchState, dispatch }: StateContext<LeadViewModel>,
        { page, limit }: fromLeadAction.ListLeadsAction
    ){
        dispatch(new fromUiAction.LoadingAction());
        return this.leadService.getInformationLeads(page, limit)
            .pipe(
                first(),
                tap((response) => {
                    dispatch(new fromUiAction.NoLoadingAction);
                    if(response.ok){
                        const pagesGenerates: number[] = [];
                        for (let i = 0; i < response.totalPages; i++) {
                            pagesGenerates.push(i + 1)
                        }

                        return patchState({
                            leads: response.leads,
                            pages: pagesGenerates,
                            totalRegisters: response.totalRegistros,
                            searchText: ''
                        })
                    }else{
                        return patchState({
                            leads: [],
                            pages: [],
                            totalRegisters: 0,
                            searchText: ''
                        })
                    }
                })
            );
    }

    @Action(fromLeadAction.ListLeadsExcelAction)
    public GetAllLeadsInformation(
        { patchState }: StateContext<LeadViewModel>
    ){
        return this.leadService.getAllInformationLeads()
            .pipe(
                first(),
                tap((response) => {
                    if(response.ok){
                        return patchState({
                            leadsForExcel: response.leads
                        });
                    }else{
                        return patchState({
                            leadsForExcel: null
                        });
                    }
                })
            );
    }

    @Action(fromLeadAction.SearchLeadsAction)
    public SearchLeadsInformation(
        { patchState, dispatch }: StateContext<LeadViewModel>,
        { termino, page, limit }: fromLeadAction.SearchLeadsAction
    ){
        dispatch(new fromUiAction.LoadingAction());
        return this.leadService.searchInformationLeads(termino, page, limit)
            .pipe(
                first(),
                tap((response) => {
                    dispatch(new fromUiAction.NoLoadingAction);
                    if(response.ok){
                        const pagesGenerates: number[] = [];
                        for (let i = 0; i < response.totalPages; i++) {
                            pagesGenerates.push(i + 1)
                        }

                        return patchState({
                            leads: response.leads,
                            pages: pagesGenerates,
                            totalRegisters: response.totalRegistros,
                            searchText: termino
                        })
                    }else{
                        return patchState({
                            leads: [],
                            pages: [],
                            totalRegisters: 0,
                            searchText: termino
                        })
                    }
                })
            );
    }

    @Action(fromLeadAction.AddLeadAction)
    public addLead(
        { dispatch }: StateContext<LeadViewModel>,
        { lead }: fromLeadAction.AddLeadAction
    ){
        dispatch(new fromUiAction.SubmitAction());
        return this.leadService.saveLead(lead)
            .pipe(
                tap(({ ok, msg }) => {
                    const status: IStatusResponse = { ok, msg };

                    dispatch([
                        new fromUiAction.NoSubmitAction(),
                        new fromUiAction.StatusTransacction(status)
                    ]);
                })
            );
    }

    @Action(fromLeadAction.UpdateLeadAction)
    public updateLead(
        { dispatch }: StateContext<LeadViewModel>,
        { lead }: fromLeadAction.UpdateLeadAction
    ){
        dispatch(new fromUiAction.SubmitAction());
        return this.leadService.updateLead(lead)
            .pipe(
                tap(({ ok, msg }) => {
                    const status: IStatusResponse = { ok, msg };
                    dispatch([
                        new fromUiAction.NoSubmitAction(),
                        new fromUiAction.StatusTransacction(status)
                    ]);
                })
            );
    }

    @Action(fromLeadAction.DeleteLeadAction)
    public deleteLead(
        { dispatch }: StateContext<LeadViewModel>,
        { id }: fromLeadAction.DeleteLeadAction
    ){
        dispatch(new fromUiAction.SubmitAction());
        return this.leadService.deleteLead(id)
            .pipe(
                tap(({ ok, msg }) => {
                    const status: IStatusResponse = { ok, msg };
                    dispatch([
                        new fromUiAction.NoSubmitAction(),
                        new fromUiAction.StatusTransacction(status)
                    ]);
                })
            );
    }
}