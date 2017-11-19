import { DateUtils } from '../../utils/date-utils';

export enum SanctionRequestStatus {
  Started = 'Started',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn'
}

export class SanctionRequest {
  id: number;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  requestDate: Date;
  status: SanctionRequestStatus;

  // 0 - 5 stars
  starLevel: number;

  // regional or national coordinator
  coordinatorFirstName: string;
  coordinatorLastName: string

  // email retrieved from frontend table
  coordinatorEmail: string;

  // contents of the request as JSON string
  requestContentsJSON: string;

  // contents of the request as object
  requestContents: SanctionRequestContents;

  constructor () {
    this.tournamentName = '2019 Aurora Cup';
    this.requestContents = new SanctionRequestContents();
  }

  // apply changes from form and perform various conversions
  applyChanges (formValues: any) {
    // apply new values to this object
    Object.assign(this, formValues);

    // convert dates from local to UTC
    let requestDate: Date = (formValues.requestDate != null) ? new Date (formValues.requestDate) : new Date();

    let dateUtils = new DateUtils();
    this.startDate = dateUtils.convertFromLocalToUTCDate (formValues.startDate);
    this.endDate = dateUtils.convertFromLocalToUTCDate(formValues.endDate);
    this.requestDate = dateUtils.convertFromLocalToUTCDate (requestDate);

    if (this.status == null) {
      this.status = SanctionRequestStatus.Started;
    }
    // apply rating criteria
    this.requestContents.applyChanges(formValues);
    this.requestContentsJSON = JSON.stringify (this.requestContents);
    console.log ('JSON length ', this.requestContentsJSON.length);
    this.requestContents = null;
  }

  fillScreenDef () {
      // convert dates from UTC to local
      let dateUtils = new DateUtils();
      this.startDate = dateUtils.convertFromUTCToLocalDate (this.startDate);
      this.endDate = dateUtils.convertFromUTCToLocalDate (this.endDate);
      this.requestDate = dateUtils.convertFromUTCToLocalDate (this.requestDate);

    let settings: any = JSON.parse (this.requestContentsJSON);
    this.requestContents = Object.assign(new SanctionRequestContents(), settings);
  }
}

/**
* we are not likely to query on these items so let's store them as JSON string in the database so if
* something is changed we don't have to change DB schema.
*/
export class SanctionRequestContents {
    alternateStartDate: Date;
    alternateEndDate: Date;

    webLinkURL: string;

    venueStreetAddress: string;
    venueCity: string;
    venueState: string;
    venueZipCode: number;

    clubName: string;
    clubAffiliationExpiration: Date;

    contactPersonName: string;
    contactPersonPhone: string;
    contactPersonEmail: string;
    contactPersonStreetAddress: string;
    contactPersonCity: string;
    contactPersonState: string;
    contactPersonZip: number;

    tournamentRefereeName: string;
    tournamentRefereeRank: string;
    tournamentRefereeMembershipExpires: Date;

    tournamentDirectorName: string;

    totalPrizeMoney: number;
    sanctionFee: number;

    categories: SanctionCategory [];

    constructor () {
      // make categories
      this.makeCategories ();
    }

    makeCategories () {
      let lighting: SanctionCategory = new SanctionCategory ("Light Strength as measured on table playing surface", "lighting", true);
      let lightCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ('300 Lux with fixtures at least 8 ft above the floor', 0, ''),
        new SanctionCategoryCriteria ('400 Lux', 1, ''),
        new SanctionCategoryCriteria ('600 Lux for feature matches', 2, '3 and up'),
        new SanctionCategoryCriteria ('600 Lux', 3, ''),
        new SanctionCategoryCriteria ('800 Lux for feature matches', 4, ''),
        new SanctionCategoryCriteria ('800 Lux', 5, '')
      ];
      lighting.setCriteria (lightCriteria);

      let flooring: SanctionCategory = new SanctionCategory ("Flooring Type", "flooring", true);
      let floorCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ('Wood floor or rubberized Mat on concrete or Tile for feature matches', 1, '3 and up'),
        new SanctionCategoryCriteria ('Wood floor or rubberized Mat on concrete or Tile for all matches', 2, ''),
        new SanctionCategoryCriteria ('Rubberized Mat on Wood for feature matches ', 3, ''),
        new SanctionCategoryCriteria ('Rubberized Mat on Wood for all matches', 4, '')
      ];
      flooring.setCriteria (floorCriteria);

      let amenities: SanctionCategory = new SanctionCategory ("Player Amenities", "amenities", false);
      let amenitiesCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Food & drink available inside venue", 1, ''),
        new SanctionCategoryCriteria ("Player's lounge Available", 1, '', true),
        new SanctionCategoryCriteria ("Officials Lounge Available", 1, '')
      ];
      amenities.setCriteria (amenitiesCriteria);

      this.categories = [
        lighting, flooring, amenities
      ];
    }

    applyChanges (formValues: any) {
    // apply new values to this object
    Object.assign (this, formValues);

    // now set the criteria
      for (var i = 0; i < this.categories.length; i++) {
        let category: SanctionCategory = this.categories[i];
        category.applyChanges(formValues);
      }
    }

}

/**
* Sanction category
*/
export class SanctionCategory {
    title: string;

    name: string;

    // select one item in category or all that apply
    selectOne: boolean;

    selectedValue: number;

    criteria: SanctionCategoryCriteria [];

    constructor (title: string, name: string, selectOne: boolean) {
      this.title = title;
      this.name = name;
      this.selectOne = selectOne;
      this.selectedValue = -1;
    }

    setCriteria (criteria: SanctionCategoryCriteria []) {
      this.criteria = criteria;
    }

    applyChanges (formValues: any) {
      for (var i = 0; i < this.criteria.length; i++) {
        let criteria: SanctionCategoryCriteria = this.criteria[i];
        let htmlControlName: string  = this.getHtmlControlName(i);
        var criteriaValue = formValues[htmlControlName];
        criteria.applyChanges(criteriaValue, this.selectOne);
        if (this.selectOne && criteria.selected) {
          this.selectedValue = criteriaValue;
        }
      }
    }

    getHtmlControlName (i: number) {
      return (this.selectOne === false) ? (this.name + i) : this.name;
    }
}

/**
* criteria under sanction category
*/
export class SanctionCategoryCriteria {
    name: string;
    points: number;
    selected: boolean;
    requiredForStarLevel: string;

    constructor (name: string, points: number, requiredForStarLevel: string, selected?: boolean) {
      this.name = name;
      this.points = points;
      this.selected = (selected) ? selected : false;
      this.requiredForStarLevel = requiredForStarLevel;
    }

    applyChanges (criteriaValue: any, selectOne: boolean) {
      console.log ('criteriaValue = ', criteriaValue);
      if (selectOne) {
        this.selected = (this.points == criteriaValue);
      } else {
        this.selected = (criteriaValue != undefined) ? criteriaValue : false;
      }
    }

}
