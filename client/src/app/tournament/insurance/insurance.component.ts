import { Component, OnInit } from '@angular/core';
import { InsuranceService } from './insurance.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(private insuranceService: InsuranceService) { }

  ngOnInit() {
  }

}
