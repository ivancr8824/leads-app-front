import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListLeadsAction, DeleteLeadAction, ListLeadsExcelAction, SearchLeadsAction } from 'src/app/actions/leads.action';
import { Lead } from 'src/app/models/lead.model';
import { LeadViewModel } from 'src/app/viewmodels/lead.view.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { LeadState } from '../../../state/lead.state';
import { UiState } from '../../../state/ui.state';
import { UiViewModel } from 'src/app/viewmodels/ui.view.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { LeadsService } from '../../../services/leads.service';
import { CountriesService } from '../../../services/countries.service';
import { GetCountriesAction } from '../../../actions/countries.action';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.css']
})
export class ListLeadsComponent implements OnInit {


  @Select(LeadState) model$: Observable<LeadViewModel>;
  @Select(UiState) UiModel$: Observable<UiViewModel>;

  selectedTotalRegister: number = 5;
  page: number = 1;

  constructor(
    private store: Store,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private leadService: LeadsService
  ) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
  }

  ngOnInit(): void {
    this.store.dispatch([
      new ListLeadsAction(this.page, this.selectedTotalRegister),
      new GetCountriesAction()
    ]);
  }

  newLead(){
    const newLead: Lead = {
      Id: 0,
      Email: '',
      Name: '',
      Phone: '',
      Countrie: 'ECU',
      StatusLead: 'Abierto',
    }

    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.lead = newLead
    modalRef.result.then((result)=> {
      if(result){
        const { ok, msg } = this.store.selectSnapshot(UiState.statusResponse);
        Swal.fire({
          title: (ok) ? 'Guardado' : 'Error',
          text: msg,
          icon: (ok) ? 'success' : 'error'
        });

        if(ok){
          const searchTxt: string = this.store.selectSnapshot(LeadState.searchText);
          if(searchTxt.length == 0){
            this.store.dispatch(new ListLeadsAction(this.page, this.selectedTotalRegister));
          }else{
            this.store.dispatch(new SearchLeadsAction(searchTxt, this.page, this.selectedTotalRegister));
          }
        }
      }
    }).catch(err => {
      Swal.fire('Error', err, 'error');
    });
  }

  updateLead(lead: Lead){
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.lead = lead
    modalRef.result.then((result)=> {
      if(result){
        const { ok, msg } = this.store.selectSnapshot(UiState.statusResponse);
        Swal.fire({
          title: (ok) ? 'Guardado' : 'Error',
          text: msg,
          icon: (ok) ? 'success' : 'error'
        });

        if(ok){
          const searchTxt: string = this.store.selectSnapshot(LeadState.searchText);
          if(searchTxt.length == 0){
            this.store.dispatch(new ListLeadsAction(this.page, this.selectedTotalRegister));
          }else{
            this.store.dispatch(new SearchLeadsAction(searchTxt, this.page, this.selectedTotalRegister));
          }
        }
      }
    }).catch(err => {
      Swal.fire('Error', err, 'error');
    });
  }

  deleteLead(lead: Lead){
    Swal.fire({
      title: '¿Elminar este registro?',
      text: `Realmente quieres eliminar a ${lead.Name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Procesando',
          text: 'Eliminando espere por favor...',
          showConfirmButton: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })

        this.store.dispatch(new DeleteLeadAction(lead.Id))
          .subscribe(() => {
            const { ok, msg } = this.store.selectSnapshot(UiState.statusResponse);
              Swal.fire({
                title: (ok) ? 'Eliminado' : 'Error',
                text: msg,
                icon: (ok) ? 'success' : 'error'
              });

              if(ok){
                const searchTxt: string = this.store.selectSnapshot(LeadState.searchText);

                if(searchTxt.length == 0){
                  this.store.dispatch(new ListLeadsAction(this.page, this.selectedTotalRegister));
                }else{
                  this.store.dispatch(new SearchLeadsAction(searchTxt, this.page, this.selectedTotalRegister));
                }
                
              }
          })
      }
    })
  }

  changeTotalRegisters(){
    const searchText: string = this.store.selectSnapshot(LeadState.searchText);
    if(searchText.length === 0){
      this.store.dispatch(new ListLeadsAction(1, this.selectedTotalRegister))
    }else{
      this.store.dispatch(new SearchLeadsAction(searchText, 1, this.selectedTotalRegister));
    }
   
  }

  pagination(page: number){
    const searchText: string = this.store.selectSnapshot(LeadState.searchText);
    if(searchText.length === 0){
      this.store.dispatch(new ListLeadsAction(page, this.selectedTotalRegister))
    }else{
      this.store.dispatch(new SearchLeadsAction(searchText, page, this.selectedTotalRegister));
    }
  }


  exportExcel() {
    
    Swal.fire({
      title: 'Procesando',
      text: 'Generando el archivo espere por favor...',
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    this.store.dispatch(new ListLeadsExcelAction())
      .subscribe(() => {
          const leadsForExcel: Lead[] = this.store.selectSnapshot(LeadState.registerExportExcel);
          if(leadsForExcel !== null){
            if(leadsForExcel.length === 0) 
            {
              Swal.fire('Advertencia', 'No hay registros para descargar', 'warning');
            }
            else {
              Swal.close();
              let workbook = new Workbook();
              let worksheet = workbook.addWorksheet('LeadsData');

              worksheet.columns = [
                { header: 'Id', key: 'id', width: 10, },
                { header: 'Nombre', key: 'name', width: 32 },
                { header: 'Télefono', key: 'phone', width: 20 },
                { header: 'Email', key: 'email', width: 35 },
                { header: 'Estado Lead', key: 'stateLead', width: 20 },
              ];

              ['A1', 'B1', 'C1', 'D1', 'E1'].map(key => {
                  worksheet.getCell(key).fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{ argb:'020202' }
                  };

                  worksheet.getCell(key).font = { color: { argb:'FFFFFF' }, bold: true };
              });
              
              leadsForExcel.forEach(e => {
                worksheet.addRow({
                  id: e.Id, 
                  name: e.Name, 
                  phone: e.Phone, 
                  email: e.Email, 
                  stateLead: e.StatusLead 
                },"n");
              });
          
              workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, 'LeadsData.xlsx');
              });
            }
          }else {
            Swal.fire('Error', 'Error al generar el archivo', 'error');
          }
      });
  }

  sendEmail(email: string){
    Swal.fire({
      title: 'Procesando',
      text: 'Enviando correo electrónico espere por favor...',
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    this.leadService.sendEmail(email.toLowerCase().trim())
      .subscribe(resp => {
        if(resp.ok){
          Swal.fire('Envio Existoso', resp.msg, 'success');
        }else{
          Swal.fire('Error', resp.msg, 'error');
        }
      })
  }

  openWhatsapp(lead: Lead){
    //?texto=Quisiera%20consultar%20sobre%20la%20oferta%20de%20departamento
    window.open(`https://wa.me/${lead.Phone}`,'Whatsapp')
  }
}
