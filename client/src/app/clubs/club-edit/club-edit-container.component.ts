import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromClubs from './../ngrx/club.reducer'
import { PagingInfo } from "./../../utils/paging-info";

import * as RouterActions from './../../router.actions';
import { ClubAddAction, ClubDuplicateAction, ClubEditAction, ClubSaveAction } from './../ngrx/club.actions';

import { Club } from './../club.model';
import * as AccountActions from './../../shared/account/ngrx/account.actions';
import * as fromAccount from './../../shared/account/ngrx/account.reducer';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

//
// so called smart component where all interaction with server is happening
//
@Component({
  selector: 'club-edit-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <club-edit [club]="club$ | async" [systemPublicKey]="systemPublicKey$ | async" (saved)="onSave($event)" (canceled)="onCancel($event)"></club-edit>
  `,
})
export class ClubEditContainerComponent implements OnInit {

  // this is what we edit
  club$: Observable<Club>;
  // this is its id
  editedId: number;

  systemPublicKey$:Observable<string>;

  constructor(private store: Store<fromClubs.State>,
              private accountStore: Store<fromAccount.State>,
              private activatedRoute: ActivatedRoute) {
    this.club$ = store.select (fromClubs.getEdited);
    this.systemPublicKey$ = accountStore.select(fromAccount.getSystemPublicKey);
  }

  ngOnInit() {
        // figure out which action it is we are asked te execute
        let isAdd: boolean = false;
        let isDuplicate: boolean = false;
        const urlSegmentArray: UrlSegment[] = this.activatedRoute.snapshot.url;
        for (var i = 0; i < urlSegmentArray.length; i++) {
          var urlSegment: UrlSegment = urlSegmentArray[i];
          if (urlSegment.path == 'add') {
           isAdd = true;
          }
          if (urlSegment.path == 'duplicate') {
           isDuplicate = true;
          }
        }
        this.editedId = this.activatedRoute.snapshot.params['id'] || -1;
        if (isAdd) {
          this.store.dispatch(new ClubAddAction());
        } else if (isDuplicate) {
          this.store.dispatch(new ClubDuplicateAction(this.editedId));
          this.editedId = -1;
        } else {
          this.store.dispatch(new ClubEditAction(this.editedId));
        }
        // get stripe system key
        this.accountStore.dispatch(new AccountActions.AccountSystemAction());
  }

  onSave(updatedClub: Club) {
    //console.log ('container.onSave updatedClub ', updatedClub);
    updatedClub.id = (this.editedId != -1) ? this.editedId : null;
    this.store.dispatch(new ClubSaveAction(updatedClub));
  }

  onCancel(event) {
    //console.log ('container.onCancel event', event);
    this.store.dispatch (new RouterActions.Back());
  }

}
