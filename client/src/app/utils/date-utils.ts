import * as moment from 'moment';

export class DateUtils {

  constructor () {

  }

  /**
  * We store dates in UTC so they are time zone independent.
  * Now convert to local time zone so date picker displays them correctly.
  */
  convertFromUTCToLocalDate  (utcDate: Date): Date {
    // incoming string is in UTC
//    console.log ('UTC time: ', utcDate);
    let utcMoment = moment.utc(utcDate,  moment.ISO_8601);
    // convert to local time zone
    let localMoment = moment ([utcMoment.year(), utcMoment.month(), utcMoment.date(), 0, 0, 0]).local();
    let localDate = localMoment.toDate();
    return localDate;
  }

  convertFromLocalToUTCDate (localDate: Date) : Date {
//    console.log ('localDate ', localDate);

    let localMoment = moment (localDate);
    let utcMoment = moment([localMoment.year(), localMoment.month(), localMoment.date(), 0, 0 ,0]).utc();
    let utcDate = utcMoment.toDate();
//    console.log ('utcDate ', utcDate);
    return utcDate;
  }
}
