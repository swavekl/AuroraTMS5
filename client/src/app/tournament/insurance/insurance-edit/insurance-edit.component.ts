import { Component, OnInit } from '@angular/core';
import {SanctionService} from "../../sanction/sanction.service";

@Component({
  selector: 'app-insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {
  orgName:string = "Fox Valley Table Tennis Club";
  orgStreetAddress:string = "1240 E Diehl Rd";
  orgCity:string = "Naperville";
  orgZip:number = 60540;
  orgState:string;
  reqDate:Date;
  personName:string;
  phoneNumber:string;
  email:string;
  certStreetAddress:string = "1240 E Diehl Rd";
  certCity:string = "Naperville";
  certZip:number = 60540;
  constructor(private sanctionService: SanctionService) {

  }

  ngOnInit() {
  }

  save(){
    console.log("Saving....");
  }

}
