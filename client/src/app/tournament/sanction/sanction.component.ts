import { Component, OnInit } from '@angular/core';
import { SanctionService, SanctionRequest } from './sanction.service';

@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.css']
})
export class SanctionComponent implements OnInit {

  sanctionRequests: SanctionRequest[];

  constructor(private sanctionService: SanctionService) {
  }

   ngOnInit() {
    this.sanctionService.list().subscribe(
    data =>
    {
      this.sanctionRequests = data;
      console.log ('sanctionRequests', this.sanctionRequests);
    },
    err => {
        // Log errors if any
        console.log(err);
    }
    );
  }
}
