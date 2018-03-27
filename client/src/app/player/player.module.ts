import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGRX store
import { StoreModule, ActionReducerMap } from '@ngrx/store';

//
// NGRX Effects
//
import { EffectsModule } from '@ngrx/effects';
import { PlayerProfileEffects } from './ngrx/player-profile.effects';
export const playerFeatureEffects = [
  PlayerProfileEffects
];

//
// NGRX Reducers & States
//
import * as fromPlayerProfile from './ngrx/player-profile.reducer';
export const playerFeatureReducers: ActionReducerMap<any> = {
  subFeaturePlayerProfile: fromPlayerProfile.PlayerProfileReducer
};

export interface PlayersState {
  playerProfile: fromPlayerProfile.State;
};

// UI components
import { PlayerProfileEditComponent } from './player-profile-edit/player-profile-edit.component';
import { PlayerProfileEditContainerComponent } from './player-profile-edit/player-profile-edit-container.component';
import { PlayerProfileService } from './player-profile.service';

import { PlayerRoutingModule } from './player-routing';


@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,

    StoreModule.forFeature('featurePlayer', playerFeatureReducers),
    EffectsModule.forFeature(playerFeatureEffects)
  ],
  declarations: [
    PlayerProfileEditComponent,
    PlayerProfileEditContainerComponent
  ],
  providers: [
    PlayerProfileService
  ]
})
export class PlayerModule { }
