import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import {Observable} from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { InsuranceRequestAddAction, InsuranceRequestEditAction } from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';

@Component({
  selector: 'app-insurance-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {
  insuranceRequest$: Observable<InsuranceRequest>;
  //  orgName:string = "Fox Valley Table Tennis Club";
  // orgStreetAddress:string = "1240 E Diehl Rd";
  // orgCity:string = "Naperville";
  // orgZip:number = 60540;
  // orgState:string;
  // reqDate:Date;
  // personName:string;
  // phoneNumber:string;
  // email:string;
  // certStreetAddress:string = "1240 E Diehl Rd";
  // certCity:string = "Naperville";
  // certZip:number = 60540;
  //insuranceRequest:InsuranceRequest;
  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router)
    this.insuranceRequest$ = store.select(fromInsuranceRequest.getEdited);

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
