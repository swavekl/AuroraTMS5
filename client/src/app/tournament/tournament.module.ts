import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TournamentRoutingModule } from './tournament-routing.module';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceService } from './insurance/insurance.service';
import { SanctionComponent } from './sanction/sanction.component';
import { SanctionService } from './sanction/sanction.service';
import { ConfigureTournamentComponent } from './configure-tournament/configure-tournament.component';
import {InsuranceEditComponent} from "./insurance/insurance-edit/insurance-edit.component";
import { ConfigureTournamentService } from './configure-tournament/configure-tournament.service';

import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

import {CdkTableModule} from "@angular/cdk/table";

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import * as fromConfigureTournament from './configure-tournament/configure-tournament.reducer';
import * as fromInsuranceRequest from './insurance/insurance.reducer';
import * as fromSanctionRequest from './sanction/sanction.reducer';

export const tournamentReducers: ActionReducerMap<any> = {
  subFeature1: fromConfigureTournament.configureTournamentReducer,
  subFeatureInsurance: fromInsuranceRequest.insuranceRequestReducer,
  subFeatureSanction: fromSanctionRequest.sanctionRequestReducer
};

import { EffectsModule } from '@ngrx/effects';
import { ConfigureTournamentEffects } from './configure-tournament/configure-tournament.effects';
import { InsuranceRequestEffects } from './insurance/insurance.effects';
import {SanctionRequestEffects} from "./sanction/sanction.effects";
import { SanctionEditComponent } from './sanction/sanction-edit/sanction-edit.component';

export const tournamentEffects = [ConfigureTournamentEffects, InsuranceRequestEffects, SanctionRequestEffects];


export interface TournamentState {
  sanction: fromSanctionRequest.State;
  insurance: fromInsuranceRequest.State;
  configureTournament: fromConfigureTournament.State;
//  router: fromRouter.RouterState;
}


@NgModule({
  imports: [
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FlexLayoutModule,
    TournamentRoutingModule,
    FormsModule,
    StoreModule.forFeature('featureTournaments', tournamentReducers),
    EffectsModule.forFeature(tournamentEffects)
  ],
  declarations: [
    InsuranceComponent,
    SanctionComponent,
    ConfigureTournamentComponent,
    InsuranceEditComponent,
    SanctionEditComponent
  ],
  providers: [
    InsuranceService,
    SanctionService,
    ConfigureTournamentService,
   {provide: DateAdapter, useClass: NativeDateAdapter}
  ]
})
export class TournamentModule { }
