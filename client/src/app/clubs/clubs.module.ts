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
  MatTabsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter,
  MatExpansionModule,
  MatStepperModule
} from "@angular/material";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FlexLayoutModule } from "@angular/flex-layout";

import {CdkTableModule} from "@angular/cdk/table";

import { StoreModule, ActionReducerMap } from '@ngrx/store';

//
// NGRX Effects
//
import { EffectsModule } from '@ngrx/effects';
import { ClubEffects } from './ngrx/club.effects';
export const clubFeatureEffects = [
  ClubEffects
];

//
// NGRX Reducers & States
//
import * as fromClub from './ngrx/club.reducer';
export const clubFeatureReducers: ActionReducerMap<any> = {
  subFeatureClub: fromClub.clubReducer
};

export interface ClubsState {
  sanction: fromClub.State;
}

//
// UI Components
//
import { ClubListContainerComponent } from './club-list/club-list-container.component';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubEditContainerComponent } from './club-edit/club-edit-container.component';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubNameAutoComponent } from './club-name-auto/club-name-auto.component';

import { ClubsRoutingModule } from './clubs-routing';
import { ClubsService } from './clubs.service';

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
    MatTabsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatStepperModule,
    FlexLayoutModule,
    CdkTableModule,

    MatAutocompleteModule,

    ClubsRoutingModule,
    StoreModule.forFeature('featureClub', clubFeatureReducers),
    EffectsModule.forFeature(clubFeatureEffects)
  ],
  declarations: [
    ClubListContainerComponent,
    ClubListComponent,
    ClubEditContainerComponent,
    ClubEditComponent,
    ClubNameAutoComponent
  ],
    providers: [
      ClubsService,
    ]
})
export class ClubsModule { }
