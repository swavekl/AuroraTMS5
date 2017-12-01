import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromSanctionRequest from './../ngrx/sanction.reducer';
import * as RouterActions from './../../../router.actions';
import { SanctionRequest, SanctionRequestStatus, SanctionCategory } from './../sanction.model';

import { SanctionRequestAddAction, SanctionRequestEditAction, SanctionRequestDuplicateAction, SanctionRequestSaveAction } from './../ngrx/sanction.actions';

import { SanctionEditComponent } from './sanction-edit.component';


//


@Component({
  selector: 'sanction-edit-container',
  template:
  `
  <sanction-edit [sanctionRequest]="sanctionRequest$ | async"  (saved)="onSave($event)" (canceled)="onCancel($event)"></sanction-edit>
  `,
  styleUrls: ['./sanction-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SanctionEditContainerComponent implements OnInit {
  // this is what we edit
  sanctionRequest$: Observable<SanctionRequest>;
  // this is its id
  editedId: number;

  constructor(private store: Store<fromSanctionRequest.State>,
              private activatedRoute: ActivatedRoute) {
    this.sanctionRequest$ = store.select (fromSanctionRequest.getEdited);
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
          this.store.dispatch(new SanctionRequestAddAction());
        } else if (isDuplicate) {
          this.store.dispatch(new SanctionRequestDuplicateAction(this.editedId));
          this.editedId = -1;
        } else {
          this.store.dispatch(new SanctionRequestEditAction(this.editedId));
        }
  }

  /**
  * Save the sanction request
  */
  onSave(sanctionRequestToSave: SanctionRequest){
    sanctionRequestToSave.id = (this.editedId != -1) ? this.editedId : null;
//    console.log("container Saving sanction request....", sanctionRequestToSave);
    this.store.dispatch(new SanctionRequestSaveAction(sanctionRequestToSave));
  }

  onCancel () {
    this.store.dispatch (new RouterActions.Back());
  }
}
