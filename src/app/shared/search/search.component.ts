import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListLeadsAction, SearchLeadsAction } from 'src/app/actions/leads.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch: ElementRef<HTMLInputElement>;
  @Input() totalRegister: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  search(){
    if(this.txtSearch.nativeElement.value.length > 0){
      this.store.dispatch(new SearchLeadsAction(this.txtSearch.nativeElement.value, 1, this.totalRegister));
    }else{
      this.store.dispatch(new ListLeadsAction(1, this.totalRegister));
    }
  }

}
