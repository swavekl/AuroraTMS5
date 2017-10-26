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
  MatRadioModule, MatDatepickerModule, MatNativeDateModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

import {CdkTableModule} from "@angular/cdk/table";

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import * as fromConfigureTournament from './configure-tournament/configure-tournament.reducer';
import * as fromInsuranceRequest from './insurance/insurance.reducer';

export const tournamentReducers: ActionReducerMap<any> = {
  subFeature1: fromConfigureTournament.configureTournamentReducer,
  subFeatureInsurance: fromInsuranceRequest.insuranceRequestReducer
};

import { EffectsModule } from '@ngrx/effects';
import { ConfigureTournamentEffects } from './configure-tournament/configure-tournament.effects';
import { InsuranceRequestEffects } from './insurance/insurance.effects';

export const tournamentEffects = [ConfigureTournamentEffects, InsuranceRequestEffects];


export interface TournamentState {
//  sanction: fromSanction.State;
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
    InsuranceEditComponent
  ],
  providers: [
    InsuranceService,
    SanctionService,
    ConfigureTournamentService
  ]
})
export class TournamentModule { }
