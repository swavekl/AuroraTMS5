import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, FormGroupName, ReactiveFormsModule } from '@angular/forms';
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
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import { SharedModule } from './../shared/shared.module';

// NGRX store
import { StoreModule, ActionReducerMap } from '@ngrx/store';

//
// NGRX Effects
//
import { EffectsModule } from '@ngrx/effects';
import { PlayerProfileEffects } from './ngrx/player-profile.effects';
export const playerProfileFeatureEffects = [
  PlayerProfileEffects
];

//
// NGRX Reducers & States
//
import * as fromPlayerProfile from './ngrx/player-profile.reducer';
export const playerProfileFeatureReducers: ActionReducerMap<any> = {
  subFeaturePlayerProfile: fromPlayerProfile.PlayerProfileReducer
};

export interface PlayersState {
  playerProfile: fromPlayerProfile.State;
};

// UI components
import { PlayerProfileEditComponent } from './player-profile-edit/player-profile-edit.component';
import { PlayerProfileEditContainerComponent } from './player-profile-edit/player-profile-edit-container.component';
import { PlayerProfileListComponent } from './player-profile-list/player-profile-list.component';
import { PlayerProfileListContainerComponent } from './player-profile-list/player-profile-list-container.component';

import { PlayerProfileService } from './player-profile.service';
import { PlayerRoutingModule } from './player-routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    CdkTableModule,
    SharedModule,

    PlayerRoutingModule,

    StoreModule.forFeature('featurePlayerProfile', playerProfileFeatureReducers),
    EffectsModule.forFeature(playerProfileFeatureEffects)
  ],
  declarations: [
    PlayerProfileEditComponent,
    PlayerProfileEditContainerComponent,
    PlayerProfileListComponent,
    PlayerProfileListContainerComponent
  ],
  providers: [
    PlayerProfileService
  ]
})
export class PlayerModule { }
