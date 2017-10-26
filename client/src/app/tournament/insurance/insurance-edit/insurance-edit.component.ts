import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import {InsuranceService} from "../../insurance/insurance.service";
import {InsuranceRequest} from "../insurance.model";
import {Observable} from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { InsuranceRequestAddAction, InsuranceRequestEditAction } from '../insurance.actions';
import * as fromInsuranceRequest from '../insurance.reducer';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

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
        // get return url from route parameters or default to '/'
        let isAdd: boolean = false;
        const urlSegmentArray: UrlSegment[] = this.activatedRoute.snapshot.url;
        for (var i = 0; i < urlSegmentArray.length; i++) {
          var urlSegment: UrlSegment = urlSegmentArray[i];
          if (urlSegment.path == 'add') {
           isAdd = true;
          }
        }
        if (isAdd) {
          this.store.dispatch(new InsuranceRequestAddAction());
        } else {
          let editedId = this.activatedRoute.snapshot.params['id'] || 0;
          this.store.dispatch(new InsuranceRequestEditAction(editedId));
        }
  }

  save(){
    console.log("Saving....");
  }

}
