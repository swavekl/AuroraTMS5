import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material';
import {InsuranceRequest} from './insurance.model';
import {InsuranceService} from './insurance.service';
import {DataSource} from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import { Store } from '@ngrx/store';

import {InsuranceRequestSearchAction, PagingInfo} from './insurance.actions';
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
  loading$: Observable<boolean>;
  error$: Observable<any>;

    // MatPaginator Inputs
    length$: Observable<number>;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

  constructor(private insuranceService: InsuranceService,
              private store: Store<fromInsuranceRequest.State>,
              private router: Router)
  {
    this.loading$ = store.select(fromInsuranceRequest.getLoading);
    this.length$ = store.select(fromInsuranceRequest.getCount);
    let data$ = store.select(fromInsuranceRequest.getInsuranceRequests);
    this.dataSource = new InsuranceDataSource(data$);
    this.error$ = store.select(fromInsuranceRequest.getError);
  }

  ngOnInit() {
    let pagingInfo = new PagingInfo (0, this.pageSize);
    this.store.dispatch(new InsuranceRequestSearchAction(pagingInfo));
  }

  onPageEvent(pageEvent: PageEvent) {
    let pagingInfo = new PagingInfo (pageEvent.pageIndex * pageEvent.pageSize, pageEvent.pageSize);
    this.store.dispatch(new InsuranceRequestSearchAction(pagingInfo));
  }

  onAddInsurance () {
    this.router.navigate (['/insurance/add']);

  }

  onRowClick (row) {
    this.router.navigate (['/insurance/edit/'+row.id]);
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
