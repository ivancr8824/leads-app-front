import { Lead } from '../models/lead.model';

interface ILeads {
    leads: Lead[],
    pages: number[],
    totalRegisters: number,
    leadsForExcel: Lead[],
    searchText: string
}

export class LeadViewModel implements ILeads {
    public leads: Lead[];
    public pages: number[];
    public totalRegisters: number;
    public leadsForExcel: Lead[];
    public searchText: string;

    constructor(obj: ILeads){
        this.leads = (obj && obj.leads) || null;
        this.pages = (obj && obj.pages) || null;
        this.totalRegisters = (obj && obj.totalRegisters) || null;
        this.leadsForExcel = (obj && obj.leadsForExcel) || null;
        this.searchText = (obj && obj.searchText) || null;
    }
}