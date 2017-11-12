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
} from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';
import { StatesList } from '../../states'
import * as RouterActions from './../../../router.actions';


@Component({
  selector: 'app-insurance-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {
  insuranceRequest$: Observable<InsuranceRequest>;
  // list of states in USA
  statesList: any [];
  editedId: number;

  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) {
    this.insuranceRequest$ = store.select(fromInsuranceRequest.getEdited);
    this.statesList = new StatesList().getList();
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

  save(formValues){
    // copy changed values into this new object
    let insuranceRequestToSave = new InsuranceRequest();
    insuranceRequestToSave = Object.assign (insuranceRequestToSave, formValues);

    insuranceRequestToSave.id = (this.editedId != -1) ? this.editedId : null;
    let requestDate: Date = (formValues.requestDate != null) ? new Date (formValues.requestDate) : new Date();

    let dateUtils = new DateUtils();
    insuranceRequestToSave.eventStartDate = dateUtils.convertFromLocalToUTCDate (formValues.eventStartDate);
    insuranceRequestToSave.eventEndDate = dateUtils.convertFromLocalToUTCDate(formValues.eventEndDate);
    insuranceRequestToSave.requestDate = dateUtils.convertFromLocalToUTCDate (requestDate);

    console.log("Saving....", insuranceRequestToSave);
    // now send it
    this.store.dispatch(new InsuranceRequestSaveAction(insuranceRequestToSave));
  }

  onCancel () {
    this.store.dispatch (new RouterActions.Back());
  }
}
