import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { DateUtils } from '../../../utils/date-utils';

import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import {
  InsuranceRequestAddAction, InsuranceRequestEditAction, InsuranceRequestDuplicateAction,
  InsuranceRequestSaveAction
} from '../ngrx/insurance.actions';
import * as fromInsuranceRequest from '../ngrx/insurance.reducer';
import * as RouterActions from './../../../router.actions';


@Component({
  selector: 'insurance-edit-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
  `
  <insurance-edit [insuranceRequest]="insuranceRequest$ | async"
  (saved)="onSave($event)" (canceled)="onCancel($event)">
  </insurance-edit>
  `
})
export class InsuranceEditContainerComponent implements OnInit {
  // what we are editing
  insuranceRequest$: Observable<InsuranceRequest>;

  // id of insurance request if editing, otherwise -1
  editedId: number;

  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) {
    this.insuranceRequest$ = store.select(fromInsuranceRequest.getEdited);
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
          this.store.dispatch(new InsuranceRequestAddAction());
        } else if (isDuplicate) {
          this.store.dispatch(new InsuranceRequestDuplicateAction(this.editedId));
        } else {
          this.store.dispatch(new InsuranceRequestEditAction(this.editedId));
        }
  }

  onSave(insuranceRequestToSave: InsuranceRequest){
    insuranceRequestToSave.id = (this.editedId != -1) ? this.editedId : null;
    this.store.dispatch(new InsuranceRequestSaveAction(insuranceRequestToSave));
  }

  onCancel (eventName) {
    this.store.dispatch (new RouterActions.Back());
  }
}
