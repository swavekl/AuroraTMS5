import { Component, OnInit } from '@angular/core';
import {InsuranceRequest, InsuranceService} from './insurance.service';
import {DataSource} from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  displayColumns = ['contactName', 'contactEmail'];
  dataSource: InsuranceDataSource;

  constructor(private insuranceService: InsuranceService) { }

  ngOnInit() {
    this.insuranceService.list().subscribe(
      data => {
        this.dataSource = new InsuranceDataSource(data);
      }, err => {
        console.log(err);
      }
    );
  }

}

export class InsuranceDataSource extends DataSource<any> {
  constructor(private myData: InsuranceRequest[]) {
    super();
  }
  connect(): Observable<InsuranceRequest[]> {
    return Observable.of(this.myData);
  }
  disconnect() {}
}
