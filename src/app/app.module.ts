import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { MainPageModule } from './components/main-page.module';
import { SharedModule } from './shared/shared.module';
import { UiState } from './state/ui.state';
import { LeadState } from './state/lead.state';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesState } from './state/countries.state';
import { CampaingState } from './state/campaign.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    MainPageModule,
    HttpClientModule,
    NgxsModule.forRoot([
      UiState, 
      LeadState,
      CountriesState,
      CampaingState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgbModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
