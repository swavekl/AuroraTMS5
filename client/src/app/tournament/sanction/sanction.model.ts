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
        new SanctionCategoryCriteria ('300 Lux with fixtures at least 8 ft above the floor', 0, 'Minimum standard', true),
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

      let ceiling: SanctionCategory = new SanctionCategory ("Ceiling Height", "ceiling", true);
      let ceilingCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("8 ft ceiling height", 0, 'Minimum standard', true),
        new SanctionCategoryCriteria ("10 ft ceiling height", 0, '1'),
        new SanctionCategoryCriteria ("12 ft ceiling height", 1, ''),
        new SanctionCategoryCriteria ("16 ft ceiling height", 2, '3 and up')
      ];
      ceiling.setCriteria (ceilingCriteria);

      let courtSize: SanctionCategory = new SanctionCategory ("Court Size", "courtSize", true);
      let courtSizeCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("30 ft length, 10 ft between tables", 0, 'Minimum standard', true),
        new SanctionCategoryCriteria ("12 feet between tables", 2, '3 and up'),
        new SanctionCategoryCriteria ("14 feet between tables", 4, ''),
        new SanctionCategoryCriteria ("19x38 courts for feature matches", 5, '3 and up'),
        new SanctionCategoryCriteria ("19x38 courts", 6, ''),
        new SanctionCategoryCriteria ("23x46 courts for feature matches", 7, ''),
        new SanctionCategoryCriteria ("23x46 courts", 8, '')
      ];
      courtSize.setCriteria (courtSizeCriteria);

      let tables: SanctionCategory = new SanctionCategory ("Tables", "tables", true);
      let tablesCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Minimum standard USATT or ITTF Approved", 1, ''),
        new SanctionCategoryCriteria ("No more than two models in use", 2, '3'),
        new SanctionCategoryCriteria ("All models alike", 3, '4 and up'),
        new SanctionCategoryCriteria ("All alike, but show table for feature matches", 4, ''),
      ];
      tables.setCriteria (tablesCriteria);

      let paraTables: SanctionCategory = new SanctionCategory ("Para Tables", "paraTables", false);
      let paraTablesCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Para table if wheelchair players entered", 1, '')
      ];
      paraTables.setCriteria (paraTablesCriteria);

      let barriers: SanctionCategory = new SanctionCategory ("Barriers", "barriers", true);
      let barriersCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Barrier at net between tables or at both ends of court", 2, ''),
        new SanctionCategoryCriteria ("Barrier at net  between tables and at both ends of court", 3, ''),
        new SanctionCategoryCriteria ("Individually barriered court for feature matches", 4, '3 and up'),
        new SanctionCategoryCriteria ("All courts fully barriered", 6, '')
      ];
      barriers.setCriteria (barriersCriteria);

      let timeScheduling: SanctionCategory = new SanctionCategory ("Time Scheduling", "timeScheduling", true);
      let timeSchedulingCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Event start times", 0, 'Minimum Standard', true),
        new SanctionCategoryCriteria ("All events, all rounds", 2, '3, 4'),
        new SanctionCategoryCriteria ("Published schedule for each player, all rounds", 4, '5')
      ];
      timeScheduling.setCriteria (timeSchedulingCriteria);

      let officials: SanctionCategory = new SanctionCategory ("Officials", "officials", true);
      let officialsCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Scorekeepers for featured matches", 1, ''),
        new SanctionCategoryCriteria ("Umpires for featured matches", 2, '2'),
        new SanctionCategoryCriteria ("Umpires and scorekeepers for featured matches", 4, '3, 4'),
        new SanctionCategoryCriteria ("Uniformed Umpires and scorekeepers for all matches", 6, '5')
      ];
      officials.setCriteria (officialsCriteria);

      let eventVariety: SanctionCategory = new SanctionCategory ("Event Variety", "eventVariety", false);
      let eventVarietyCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Novice event", 1, ''),
        new SanctionCategoryCriteria ("Women's event", 1, ''),
        new SanctionCategoryCriteria ("Junior event", 1, ''),
        new SanctionCategoryCriteria ("Para event", 1, ''),
        new SanctionCategoryCriteria ("Team event", 1, ''),
        new SanctionCategoryCriteria ("Doubles event", 1, '')
      ];
      eventVariety.setCriteria (eventVarietyCriteria);

      let prizeMoney: SanctionCategory = new SanctionCategory ("Prize Money", "prizeMoney", true);
      let prizeMoneyCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("$100-$400", 1, ''),
        new SanctionCategoryCriteria ("$401-$1000", 3, ''),
        new SanctionCategoryCriteria ("$1001-$3000", 5, ''),
        new SanctionCategoryCriteria ("$3001-$6000", 7, ''),
        new SanctionCategoryCriteria ("$6001-$10000", 10, ''),
        new SanctionCategoryCriteria ("$10001 and up", 15, '')
      ];
      prizeMoney.setCriteria (prizeMoneyCriteria);

      let amenities: SanctionCategory = new SanctionCategory ("Amenities", "amenities", false);
      let amenitiesCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Food & drink available inside venue", 1, ''),
        new SanctionCategoryCriteria ("Player's lounge available", 1, ''),
        new SanctionCategoryCriteria ("Officials Lounge available", 1, '')
      ];
      amenities.setCriteria (amenitiesCriteria);

      let spectatorSeating: SanctionCategory = new SanctionCategory ("Spectator Seating", "spectatorSeating", true);
      let spectatorSeatingCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("100 seats available", 1, '3'),
        new SanctionCategoryCriteria ("250 seats available", 2, '4'),
        new SanctionCategoryCriteria ("500 seats available", 3, '5')
      ];
      spectatorSeating.setCriteria (spectatorSeatingCriteria);

      let mediaCoverage: SanctionCategory = new SanctionCategory ("Media Coverage", "mediaCoverage", false);
      let mediaCoverageCriteria: SanctionCategoryCriteria [] = [
        new SanctionCategoryCriteria ("Print", 2, ''),
        new SanctionCategoryCriteria ("TV", 2, ''),
        new SanctionCategoryCriteria ("Live streaming", 3, ''),
        new SanctionCategoryCriteria ("Live streaming - USATT equipment and commentator", 3, '')
      ];
      mediaCoverage.setCriteria (mediaCoverageCriteria);

      this.categories = [
        lighting, flooring, ceiling, courtSize, tables, paraTables, barriers, timeScheduling, officials,
        eventVariety, prizeMoney, amenities, spectatorSeating, mediaCoverage
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
