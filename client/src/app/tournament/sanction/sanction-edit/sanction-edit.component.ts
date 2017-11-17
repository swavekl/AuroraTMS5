import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import * as fromSanctionRequest from '../sanction.reducer';
import * as RouterActions from './../../../router.actions';
import { SanctionRequest } from './../sanction.model';

import { SanctionRequestAddAction, SanctionRequestEditAction, SanctionRequestDuplicateAction, SanctionRequestSaveAction } from './../sanction.actions';

@Component({
  selector: 'app-sanction-edit',
  templateUrl: './sanction-edit.component.html',
  styleUrls: ['./sanction-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SanctionEditComponent implements OnInit {
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
        } else {
          this.store.dispatch(new SanctionRequestEditAction(this.editedId));
        }
  }

  /**
  * Save the sanction request
  */
  save(formValues){
    // copy changed values into this new object
    let sanctionRequestToSave: SanctionRequest = new SanctionRequest();
    sanctionRequestToSave.applyChanges (formValues);

    sanctionRequestToSave.id = (this.editedId != -1) ? this.editedId : null;

    console.log("Saving sanction request....", sanctionRequestToSave);
    // now send it
    this.store.dispatch(new SanctionRequestSaveAction(sanctionRequestToSave));
  }

  onCancel () {
    this.store.dispatch (new RouterActions.Back());
  }

}
