import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { CampaingState } from '../../../state/campaign.state';
import { Select, Store } from '@ngxs/store';
import { CampaignViewModel } from '../../../viewmodels/campaign.view.model';
import { Observable } from 'rxjs';
import { ObtainCampaignAction, SendCampaignAction } from 'src/app/actions/campaign.action';
import { UiState } from 'src/app/state/ui.state';
import { UiViewModel } from 'src/app/viewmodels/ui.view.model';

interface DataEmail {
  Nombre: string,
  Email: string
}

@Component({
  selector: 'app-send-emails',
  templateUrl: './send-emails.component.html',
  styleUrls: ['./send-emails.component.css']
})
export class SendEmailsComponent implements OnInit {

  data: DataEmail[] = [];
  @ViewChild('fileText') fileText: ElementRef;
  @Select(CampaingState) model$: Observable<CampaignViewModel>;
  @Select(UiState) modelUi$: Observable<UiViewModel>;
  campaignSelected: number = 1;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ObtainCampaignAction());
  }

  onFileChange(evn: any){
    const target: DataTransfer = <DataTransfer>(evn.target);
    if(target.files.length !== 1) {
      Swal.fire('Error', 'No se puede subir multiples archivos', 'error');
      return;
    }
    this.data = [];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 2}));
    };
    reader.readAsBinaryString(target.files[0]);
    this.fileText.nativeElement.value = "";
  }

  sendEmails(){
    const emails: string[] = this.data.map(x => x.Email);
    this.store.dispatch(new SendCampaignAction(this.campaignSelected, emails))
      .subscribe(() => this.data = []);
  }

}