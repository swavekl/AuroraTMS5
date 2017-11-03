import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from "rxjs/Observable";
import {last} from "rxjs/operator/last";
import {withLatestFrom} from "rxjs/operator/withLatestFrom";
import { Store } from '@ngrx/store';

import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import {
  InsuranceRequestAddAction, InsuranceRequestEditAction, InsuranceRequestDuplicateAction,
  InsuranceRequestSaveAction
} from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';


@Component({
  selector: 'app-insurance-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {
  insuranceRequest$: Observable<InsuranceRequest>;

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
        if (isAdd) {
          this.store.dispatch(new InsuranceRequestAddAction());
        } else if (isDuplicate) {
          let editedId = this.activatedRoute.snapshot.params['id'] || 0;
          this.store.dispatch(new InsuranceRequestDuplicateAction(editedId));
        } else {
          let editedId = this.activatedRoute.snapshot.params['id'] || 0;
          this.store.dispatch(new InsuranceRequestEditAction(editedId));
        }
  }

  save(){
    console.log("Saving....");
    //TODO unwrap observable
    let insuranceRequest:InsuranceRequest = new InsuranceRequest();
    insuranceRequest.certFacilityName = "aaaa";
    insuranceRequest.certCity="Naperville";
    //let insuranceRequest:InsuranceRequest = withLatestFrom(this.insuranceRequest$);
    this.store.dispatch(new InsuranceRequestSaveAction(insuranceRequest));
  }

}
