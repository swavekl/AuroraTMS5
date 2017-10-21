import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageEvent} from '@angular/material';
import {InsuranceRequest} from './insurance.model';
import {InsuranceService} from './insurance.service';
import {DataSource} from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import { Store } from '@ngrx/store';

import { InsuranceRequestSearchAction } from './insurance.actions';
import * as fromInsuranceRequest from './insurance.reducer';


@Component({
  selector: 'app-insurance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})


export class InsuranceComponent implements OnInit {

  displayColumns = ['contactName', 'contactEmail'];
  dataSource: InsuranceDataSource;
  loading$: Observable<number>;

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>)
  {
    this.loading$ = store.select(fromInsuranceRequest.getLoading);
    let data$ = store.select(fromInsuranceRequest.getInsuranceRequests);
    this.dataSource = new InsuranceDataSource(data$);
  }

  ngOnInit() {
    this.store.dispatch(new InsuranceRequestSearchAction());
  }
}

/**
* Data source for the table
*/
export class InsuranceDataSource extends DataSource<any> {

  constructor(private insuranceRequests$ : Observable<InsuranceRequest[]>) {
    super();
  }

  connect(): Observable<InsuranceRequest[]> {
    return this.insuranceRequests$;
  }

  disconnect() {}
}
