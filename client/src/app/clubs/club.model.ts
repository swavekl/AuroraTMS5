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

  constructor () {

  }

  applyChanges (formValues: any) {
    let dateUtils = new DateUtils();
    formValues.affiliationExpirationDate = dateUtils.convertFromLocalToUTCDate (formValues.affiliationExpirationDate);
    Object.assign (this, formValues);

  }
}
