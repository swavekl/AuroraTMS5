export enum InsuranceRequestStatus {
  Started = 'Started',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn'
}

export enum AdditionalInsuredRole {
    None = "None",
    OwnerOfPremises = "OwnerOfPremises",
    Sponsor = "Sponsor",
    Other = "Other"
}

export class InsuranceRequest {
  id: number = 0;
  orgName:string = "";
  orgStreetAddress:string = "";
  orgCity:string = "";
  orgZip:number;
  orgState:string = "";

  requestDate:Date;

  contactName: string = '';
  contactPhoneNumber: string = '';
  contactEmail: string = '';

  certFacilityName:string = "";
  certPersonName:string = "";
  certPersonPhoneNumber:string ="";
  certPersonEmail:string = ""

  certStreetAddress:string = "";
  certCity:string = "";
  certState:string = "";
  certZip:number;

  eventName: string = "";
  eventStartDate: Date;
  eventEndDate: Date;

  isAdditionalInsured : boolean = false;
  additionalInsuredName: string = "";

  additionalInsuredRole = AdditionalInsuredRole.None;
  otherRoleDescription: string = "";

  status: InsuranceRequestStatus = InsuranceRequestStatus.Started;

  constructor () {

  }
}
