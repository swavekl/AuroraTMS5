import { DateUtils } from './../utils/date-utils';

export class PlayerProfile {
    id:number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;

    // USATT membership information
    usattID: number;
    expirationDate: Date;

    // contact information
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    gender: string

  constructor () {

  }

  applyChanges (formValues: any) {
    let dateUtils = new DateUtils();
    formValues.expirationDate = dateUtils.convertFromLocalToUTCDate (formValues.expirationDate);
    Object.assign (this, formValues);
  }

};
