import { DateUtils } from './../utils/date-utils';

export class Club {
  id: number;
  name: string;
  buildingName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  clubAdminName: string;
  clubAdminEmail: string;
  hoursAndDates: string;
  clubPhoneNumber: string;
  clubPhoneNumber2: string;
  clubWebsite: string;
  affiliationExpirationDate: Date;

  mailingCorrespondentsName: string;
  mailingStreetAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingZipCode: string;

  presidentName: string;
  presidentEmail: string;
  presidentPhoneNumber: string;

  vicePresidentName: string;
  vicePresidentEmail: string;
  vicePresidentPhoneNumber: string;

  secretaryName: string;
  secretaryEmail: string;
  secretaryPhoneNumber: string;

  treasurerName: string;
  treasurerEmail: string;
  treasurerPhoneNumber: string;

  hasMembershipStructure: boolean;
  membershipStructure: string;

  membersCount: number;
  tablesCount: number;

  programs: string;
  hasBankAccount: boolean;

  constructor () {

  }

  applyChanges (formValues: any) {
    let dateUtils = new DateUtils();
    formValues.affiliationExpirationDate = dateUtils.convertFromLocalToUTCDate (formValues.affiliationExpirationDate);
    Object.assign (this, formValues);

  }
}
