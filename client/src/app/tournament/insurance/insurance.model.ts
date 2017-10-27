export class InsuranceRequest {
  id: number = 0;
  orgName:string = "";
  orgStreetAddress:string = "";
  orgCity:string = "";
  orgZip:number;
  orgState:string = "";

  reqDate:Date;

  contactName: string = '';
  contactPhoneNumber: string = '';
  contactEmail: string = '';

  certFacilityName:string = "";
  certPersonName:string = "";
  certPersonPhoneNumber:string ="";
  certPersonEmail:string = ""

  certStreetAddress:string = "";
  certCity:string = "";
  certState:string;
  certZip:number;

  eventName: string = "";
  eventStartDate: Date;
  eventEndDate: Date;

  constructor () {

  }
}
