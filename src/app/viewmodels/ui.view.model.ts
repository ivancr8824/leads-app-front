import { IStatusResponse } from '../models/statusResponse.model';

interface IUiViewModel {
    loading: boolean;
    submit: boolean;
    statusResponse: IStatusResponse;
}

export class UiViewModel implements IUiViewModel{
    public loading: boolean;
    public submit: boolean;
    public statusResponse: IStatusResponse;

    constructor(obj: IUiViewModel) {
        this.loading = (obj && obj.loading) || false;
        this.submit = (obj && obj.submit) || false;
        this.statusResponse = (obj && obj.statusResponse) || null;
    }
}