import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import {
  InsuranceRequestAddAction, InsuranceRequestEditAction, InsuranceRequestDuplicateAction,
  InsuranceRequestSaveAction
} from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';
import { StatesList } from '../../states'


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
    // convert dates from strings to Date objects
//    let eventStartDate: Date = (formValues.eventStartDate != "") ? new Date (formValues.eventStartDate) : null;
//    let eventEndDate: Date = (formValues.eventEndDate != "") ? new Date (formValues.eventEndDate) : null;
    let requestDate: Date = (formValues.requestDate != "") ? new Date (formValues.requestDate) : new Date();

//    insuranceRequestToSave.eventStartDate = eventStartDate;
//    insuranceRequestToSave.eventEndDate = eventEndDate;
    insuranceRequestToSave.requestDate = requestDate;

    console.log("Saving....", insuranceRequestToSave);
    // now send it
    this.store.dispatch(new InsuranceRequestSaveAction(insuranceRequestToSave));
  }

}
