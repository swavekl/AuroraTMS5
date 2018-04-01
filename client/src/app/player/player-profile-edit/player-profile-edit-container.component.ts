import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromPlayerProfile from './../ngrx/player-profile.reducer';
import * as RouterActions from './../../router.actions';
import { PlayerProfile } from './../player-profile.model';

import { PlayerProfileAddAction, PlayerProfileEditAction, PlayerProfileSaveAction } from './../ngrx/player-profile.actions';

import { PlayerProfileEditComponent } from './player-profile-edit.component';


@Component({
  selector: 'player-profile-edit-container',
  template: `
  <player-profile-edit [playerProfile]="playerProfile$ | async"
  (saved)="onSave($event)"
  (canceled)="onCancel($event)"></player-profile-edit>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerProfileEditContainerComponent implements OnInit {
  // this is what we edit
  playerProfile$: Observable<PlayerProfile>;
  // this is its id
  editedId: number;

  constructor(private store: Store<fromPlayerProfile.State>,
              private activatedRoute: ActivatedRoute) {
    this.playerProfile$ = store.select (fromPlayerProfile.getEdited);
  }

  ngOnInit() {
      // figure out which action it is we are asked te execute
      let isAdd: boolean = false;
      const urlSegmentArray: UrlSegment[] = this.activatedRoute.snapshot.url;
      for (var i = 0; i < urlSegmentArray.length; i++) {
        var urlSegment: UrlSegment = urlSegmentArray[i];
        if (urlSegment.path == 'add') {
         isAdd = true;
        }
      }
      this.editedId = this.activatedRoute.snapshot.params['id'] || -1;
      if (isAdd) {
        this.store.dispatch(new PlayerProfileAddAction());
      } else {
        this.store.dispatch(new PlayerProfileEditAction(this.editedId));
      }
  }

  /**
  * Save the player profile
  */
  onSave(playerProfileToSave: PlayerProfile){
    playerProfileToSave.id = (this.editedId != -1) ? this.editedId : null;
    console.log("container Saving player profile....", playerProfileToSave);
    this.store.dispatch(new PlayerProfileSaveAction(playerProfileToSave));
  }

  onCancel (eventName) {
    this.store.dispatch (new RouterActions.Back());
  }

}
