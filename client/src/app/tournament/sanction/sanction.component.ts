import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {SanctionService, SanctionRequest} from './sanction.service';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.css']
})
export class SanctionComponent implements OnInit {

  displayColumns = ['tournamentName', 'startDate', 'endDate'];
  dataSource: SanctionDataSource;

  constructor(private sanctionService: SanctionService) {
  }

  ngOnInit() {
    this.sanctionService.list().subscribe(
      data => {
        this.dataSource = new SanctionDataSource(data);
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }
}


export class SanctionDataSource extends DataSource<any> {
  constructor(private myData: SanctionRequest[]) {
    super();
    // console.log('data', this.myData);
  }

  connect(): Observable<SanctionRequest[]> {
    return Observable.of(this.myData);
  }

  disconnect() {
  }
}
