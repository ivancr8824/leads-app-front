import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AddLeadAction, UpdateLeadAction } from '../../actions/leads.action';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lead } from '../../models/lead.model';
import { UiState } from 'src/app/state/ui.state';
import { UiViewModel } from '../../viewmodels/ui.view.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesState } from '../../state/countries.state';
import { CountriesViewModel } from 'src/app/viewmodels/countries.view.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public lead: Lead;

  @Select(UiState) uISubmit$: Observable<UiViewModel>
  @Select(CountriesState) countries$: Observable<CountriesViewModel>

  leadForm: FormGroup;
  idRegister: number;

  constructor(
    private store: Store, 
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { 
    
  }

  ngOnInit(): void {
    this.idRegister = this.lead.Id;
    this.leadForm = this.fb.group({
      name: new FormControl(this.lead.Name, Validators.required),
      phone: new FormControl(this.lead.Phone, this.phoneNumberValidator),
      email: new FormControl(this.lead.Email, Validators.email),
      countrie: new FormControl(this.lead.Countrie, Validators.required),
      statusLead: new FormControl(this.lead.StatusLead, Validators.required)
    });
  }

  get name() {
    return this.leadForm.get('name');
  }

  get phone() {
    return this.leadForm.get('phone');
  }
  
  get email() {
    return this.leadForm.get('email');
  }

  get countrie() {
    return this.leadForm.get('countrie');
  }

  get statusLead() {
    return this.leadForm.get('statusLead');
  }

  private phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }

  saveLead(){

    const countries = this.store.selectSnapshot(CountriesState.getCountries);
    const { code } = countries.filter(x => x.name === this.leadForm.value.countrie)[0]; 
    let phone: string = ''

    if(this.leadForm.value.phone.split('')[0] === '0'){
      phone = `${code.slice(1)}${this.leadForm.value.phone.slice(1)}`;
    }else{
      phone = `${code.slice(1)}${this.leadForm.value.phone}`;
    }

    const lead: Lead = {
      Id: this.idRegister,
      Name: this.leadForm.value.name,
      Email: this.leadForm.value.email,
      Phone: phone,
      Countrie: this.leadForm.value.countrie,
      StatusLead: this.leadForm.value.statusLead
    }
    
    if(this.idRegister === 0){
      this.store.dispatch(new AddLeadAction(lead))
        .subscribe(() => this.activeModal.close(true));
    }else{
      this.store.dispatch(new UpdateLeadAction(lead))
        .subscribe(() => this.activeModal.close(true));
    }
  }

  closeModal() {
    this.activeModal.close(null);
  }

}
