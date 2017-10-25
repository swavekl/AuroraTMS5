import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import { InsuranceRequestAddAction, InsuranceRequestEditAction } from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';

import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-insurance-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {

  editedId: number;
  insuranceRequest$ : Observable<InsuranceRequest>;

  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router)
  {
    this.insuranceRequest$ = store.select (fromInsuranceRequest.getEdited);
  }

  ngOnInit() {
        // get return url from route parameters or default to '/'
        this.editedId = this.activatedRoute.snapshot.queryParams['id'] || 0;
  console.log ('in InsuranceEditComponent.ngOnInit id is ' + this.editedId);
        if (this.editedId == 0) {
          this.store.dispatch(new InsuranceRequestAddAction());
        } else {
          this.store.dispatch(new InsuranceRequestEditAction(this.editedId));
        }
  }

  save(){
    console.log("Saving....");
  }

}
