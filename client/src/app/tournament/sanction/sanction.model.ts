import { DateUtils } from '../../utils/date-utils';

export enum SanctionRequestStatus {
  Started = 'Started',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn'
}

/**
* criteria under sanction category
*/
export class SanctionCategoryCriteria {
    name: string;
    points: number;
    selected: boolean;
    requiredForStarLevel: string;

    constructor () {
      this.name = "";
      this.points = 0;
      this.selected = false;
      this.requiredForStarLevel = "";
    }

    setValues (name: string, points: number, requiredForStarLevel: string, selected?: boolean) {
      this.name = name;
      this.points = points;
      this.selected = (selected) ? selected : false;
      this.requiredForStarLevel = requiredForStarLevel;
    }

    applyChanges (criteriaValue: any, selectOne: boolean) {
      if (selectOne) {
        this.selected = (this.points == criteriaValue);
      } else {
        this.selected = (criteriaValue != undefined) ? criteriaValue : false;
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

    // default constructor needed for decorator
    constructor () {
      this.title = "";
      this.name = "";
      this.selectOne = false;
      this.selectedValue = 0;
    }

    setValues (title: string, name: string, selectOne: boolean) {
      this.title = title;
      this.name = name;
      this.selectOne = selectOne;
      this.selectedValue = 0;
      return this;
    }

    setCriteria (criteria: SanctionCategoryCriteria []) {
      this.criteria = criteria;
    }

    // fills categories from formValues supplied by the html form
    applyChanges (formValues: any) {
      for (var i = 0; i < this.criteria.length; i++) {
        let htmlControlName: string  = this.getHtmlControlName(i);
        var criteriaValue = formValues[htmlControlName];
        let criterion: SanctionCategoryCriteria = this.criteria[i];
        criterion.applyChanges(criteriaValue, this.selectOne);
        if (this.selectOne && criterion.selected) {
          this.selectedValue = criteriaValue;
        }
      }
      //console.log ('in applyChanges for ' + this.name + " has selectedValue of " + this.selectedValue);
    }

    // fills category from supplied sourceCategory generic object
    fillFromSource(sourceCategory: any) {
      let criteriaSettings: any [] = sourceCategory.criteria || [];
      for (var i = 0; i < criteriaSettings.length; i++) {
        let source : any = criteriaSettings[i];
        let target : SanctionCategoryCriteria = (this.criteria.length > i) ? this.criteria[i] : null;
        let criteriaValue = (this.selectOne) ? sourceCategory.selectedValue : source.selected;
        if (source && target) {
          target.applyChanges (criteriaValue, this.selectOne);
        }
      }
      if (this.selectOne) {
          this.selectedValue = sourceCategory.selectedValue;
      }
    }

    getHtmlControlName (i: number) {
      return (this.selectOne === false) ? (this.name + i) : this.name;
    }

    getSubTotal () {
      let total: number = 0;
      if (this.selectOne) {
        total = this.selectedValue;
      } else {
        for (var i = 0; i < this.criteria.length; i++) {
          let criterion: SanctionCategoryCriteria = this.criteria[i];
          if (criterion.selected) {
            total += criterion.points;
          }
        }
      }
      return total;
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

    // constructs default categories
    makeCategories () {
      let lighting: SanctionCategory = new SanctionCategory ().setValues ("Light Strength as measured on table playing surface", "lighting", true);
      let lightCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ('300 Lux with fixtures at least 8 ft above the floor', 0, 'Minimum standard', true),
        this.makeSanctionCategoryCriteria ('400 Lux', 1, ''),
        this.makeSanctionCategoryCriteria ('600 Lux for feature matches', 2, '3 and up'),
        this.makeSanctionCategoryCriteria ('600 Lux', 3, ''),
        this.makeSanctionCategoryCriteria ('800 Lux for feature matches', 4, ''),
        this.makeSanctionCategoryCriteria ('800 Lux', 5, '')
      ];
      lighting.setCriteria (lightCriteria);

      let flooring: SanctionCategory = new SanctionCategory ().setValues ("Flooring Type", "flooring", true);
      let floorCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ('Wood floor or rubberized Mat on concrete or Tile for feature matches', 1, '3 and up'),
        this.makeSanctionCategoryCriteria ('Wood floor or rubberized Mat on concrete or Tile for all matches', 2, ''),
        this.makeSanctionCategoryCriteria ('Rubberized Mat on Wood for feature matches ', 3, ''),
        this.makeSanctionCategoryCriteria ('Rubberized Mat on Wood for all matches', 4, '')
      ];
      flooring.setCriteria (floorCriteria);

      let ceiling: SanctionCategory = new SanctionCategory ().setValues ("Ceiling Height", "ceiling", true);
      let ceilingCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("8 ft ceiling height", 0, 'Minimum standard', true),
        this.makeSanctionCategoryCriteria ("10 ft ceiling height", 0, '1'),
        this.makeSanctionCategoryCriteria ("12 ft ceiling height", 1, ''),
        this.makeSanctionCategoryCriteria ("16 ft ceiling height", 2, '3 and up')
      ];
      ceiling.setCriteria (ceilingCriteria);

      let courtSize: SanctionCategory = new SanctionCategory ().setValues ("Court Size", "courtSize", true);
      let courtSizeCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("30 ft length, 10 ft between tables", 0, 'Minimum standard', true),
        this.makeSanctionCategoryCriteria ("12 feet between tables", 2, '3 and up'),
        this.makeSanctionCategoryCriteria ("14 feet between tables", 4, ''),
        this.makeSanctionCategoryCriteria ("19x38 courts for feature matches", 5, '3 and up'),
        this.makeSanctionCategoryCriteria ("19x38 courts", 6, ''),
        this.makeSanctionCategoryCriteria ("23x46 courts for feature matches", 7, ''),
        this.makeSanctionCategoryCriteria ("23x46 courts", 8, '')
      ];
      courtSize.setCriteria (courtSizeCriteria);

      let tables: SanctionCategory = new SanctionCategory ().setValues ("Tables", "tables", true);
      let tablesCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Minimum standard USATT or ITTF Approved", 1, ''),
        this.makeSanctionCategoryCriteria ("No more than two models in use", 2, '3'),
        this.makeSanctionCategoryCriteria ("All models alike", 3, '4 and up'),
        this.makeSanctionCategoryCriteria ("All alike, but show table for feature matches", 4, ''),
      ];
      tables.setCriteria (tablesCriteria);

      let paraTables: SanctionCategory = new SanctionCategory ().setValues ("Para Tables", "paraTables", false);
      let paraTablesCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Para table if wheelchair players entered", 1, '')
      ];
      paraTables.setCriteria (paraTablesCriteria);

      let barriers: SanctionCategory = new SanctionCategory ().setValues ("Barriers", "barriers", true);
      let barriersCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Barrier at net between tables or at both ends of court", 2, ''),
        this.makeSanctionCategoryCriteria ("Barrier at net  between tables and at both ends of court", 3, ''),
        this.makeSanctionCategoryCriteria ("Individually barriered court for feature matches", 4, '3 and up'),
        this.makeSanctionCategoryCriteria ("All courts fully barriered", 6, '')
      ];
      barriers.setCriteria (barriersCriteria);

      let timeScheduling: SanctionCategory = new SanctionCategory ().setValues ("Time Scheduling", "timeScheduling", true);
      let timeSchedulingCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Event start times", 0, 'Minimum Standard', true),
        this.makeSanctionCategoryCriteria ("All events, all rounds", 2, '3, 4'),
        this.makeSanctionCategoryCriteria ("Published schedule for each player, all rounds", 4, '5')
      ];
      timeScheduling.setCriteria (timeSchedulingCriteria);

      let officials: SanctionCategory = new SanctionCategory ().setValues ("Officials", "officials", true);
      let officialsCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Scorekeepers for featured matches", 1, ''),
        this.makeSanctionCategoryCriteria ("Umpires for featured matches", 2, '2'),
        this.makeSanctionCategoryCriteria ("Umpires and scorekeepers for featured matches", 4, '3, 4'),
        this.makeSanctionCategoryCriteria ("Uniformed Umpires and scorekeepers for all matches", 6, '5')
      ];
      officials.setCriteria (officialsCriteria);

      let eventVariety: SanctionCategory = new SanctionCategory ().setValues ("Event Variety", "eventVariety", false);
      let eventVarietyCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Novice event", 1, ''),
        this.makeSanctionCategoryCriteria ("Women's event", 1, ''),
        this.makeSanctionCategoryCriteria ("Junior event", 1, ''),
        this.makeSanctionCategoryCriteria ("Para event", 1, ''),
        this.makeSanctionCategoryCriteria ("Team event", 1, ''),
        this.makeSanctionCategoryCriteria ("Doubles event", 1, '')
      ];
      eventVariety.setCriteria (eventVarietyCriteria);

      let prizeMoney: SanctionCategory = new SanctionCategory ().setValues ("Prize Money", "prizeMoney", true);
      let prizeMoneyCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("$100-$400", 1, ''),
        this.makeSanctionCategoryCriteria ("$401-$1000", 3, ''),
        this.makeSanctionCategoryCriteria ("$1001-$3000", 5, ''),
        this.makeSanctionCategoryCriteria ("$3001-$6000", 7, ''),
        this.makeSanctionCategoryCriteria ("$6001-$10000", 10, ''),
        this.makeSanctionCategoryCriteria ("$10001 and up", 15, '')
      ];
      prizeMoney.setCriteria (prizeMoneyCriteria);

      let amenities: SanctionCategory = new SanctionCategory ().setValues ("Amenities", "amenities", false);
      let amenitiesCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Food & drink available inside venue", 1, ''),
        this.makeSanctionCategoryCriteria ("Player's lounge available", 1, ''),
        this.makeSanctionCategoryCriteria ("Officials Lounge available", 1, '')
      ];
      amenities.setCriteria (amenitiesCriteria);

      let spectatorSeating: SanctionCategory = new SanctionCategory ().setValues ("Spectator Seating", "spectatorSeating", true);
      let spectatorSeatingCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("100 seats available", 1, '3'),
        this.makeSanctionCategoryCriteria ("250 seats available", 2, '4'),
        this.makeSanctionCategoryCriteria ("500 seats available", 3, '5')
      ];
      spectatorSeating.setCriteria (spectatorSeatingCriteria);

      let mediaCoverage: SanctionCategory = new SanctionCategory ().setValues ("Media Coverage", "mediaCoverage", false);
      let mediaCoverageCriteria: SanctionCategoryCriteria [] = [
        this.makeSanctionCategoryCriteria ("Print", 2, ''),
        this.makeSanctionCategoryCriteria ("TV", 2, ''),
        this.makeSanctionCategoryCriteria ("Live streaming", 3, ''),
        this.makeSanctionCategoryCriteria ("Live streaming - USATT equipment and commentator", 3, '')
      ];
      mediaCoverage.setCriteria (mediaCoverageCriteria);

      this.categories = [
        lighting, flooring, ceiling, courtSize, tables, paraTables, barriers, timeScheduling, officials,
        eventVariety, prizeMoney, amenities, spectatorSeating, mediaCoverage
      ];
    }

    // transfers values from the object created by the html form into this object
    // selected rating criteria are in properties like 'lighting', 'amenities0'
    applyChanges (formValues: any) {
      // apply new values to this object
      //Object.assign (this, formValues);
      this.copySimpleProperties(formValues);

      // now set the criteria
      for (var i = 0; i < this.categories.length; i++) {
        let category: SanctionCategory = this.categories[i];
        category.applyChanges(formValues);
      }
    }

    // fills requestContents from generic object which doesn't have methods on this class
    // this generic object has categories and criteria object arrays but they are again plain typescript objects not the ones with methods
    fillSettings (settings: any) {
      this.copySimpleProperties(settings);

      // now set the criteria
      for (var i = 0; i < this.categories.length; i++) {
        let category: SanctionCategory = this.categories[i];
        let sourceCategory : any = (settings.categories && settings.categories.length > i) ? settings.categories[i] : null;
        if (sourceCategory && sourceCategory.name == category.name) {
          category.fillFromSource(sourceCategory);
        }
      }
    }

    // copied only selected items without copying categories selection criteria
    copySimpleProperties (formValues: any) {
        this.alternateStartDate                  = formValues.alternateStartDate                ;
        this.alternateEndDate                    = formValues.alternateEndDate                  ;
        this.webLinkURL                          = formValues.webLinkURL                        ;
        this.venueStreetAddress                  = formValues.venueStreetAddress                ;
        this.venueCity                           = formValues.venueCity                         ;
        this.venueState                          = formValues.venueState                        ;
        this.venueZipCode                        = formValues.venueZipCode                      ;
        this.clubName                            = formValues.clubName                          ;
        this.clubAffiliationExpiration           = formValues.clubAffiliationExpiration         ;
        this.contactPersonName                   = formValues.contactPersonName                 ;
        this.contactPersonPhone                  = formValues.contactPersonPhone                ;
        this.contactPersonEmail                  = formValues.contactPersonEmail                ;
        this.contactPersonStreetAddress          = formValues.contactPersonStreetAddress        ;
        this.contactPersonCity                   = formValues.contactPersonCity                 ;
        this.contactPersonState                  = formValues.contactPersonState                ;
        this.contactPersonZip                    = formValues.contactPersonZip                  ;
        this.tournamentRefereeName               = formValues.tournamentRefereeName             ;
        this.tournamentRefereeRank               = formValues.tournamentRefereeRank             ;
        this.tournamentDirectorName              = formValues.tournamentDirectorName            ;
        this.totalPrizeMoney                     = formValues.totalPrizeMoney                   ;
        this.sanctionFee                         = formValues.sanctionFee                       ;
        this.tournamentRefereeMembershipExpires  = formValues.tournamentRefereeMembershipExpires;
    }

    //
    makeSanctionCategoryCriteria (name: string, points: number, requiredForStarLevel: string, selected?: boolean) {
      let sanctionCategoryCriteria: SanctionCategoryCriteria = new SanctionCategoryCriteria();
      sanctionCategoryCriteria.name = name;
      sanctionCategoryCriteria.points = points;
      sanctionCategoryCriteria.selected = selected;
      sanctionCategoryCriteria.requiredForStarLevel = requiredForStarLevel;
      return sanctionCategoryCriteria;
    }

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
    this.id = formValues.id;
    this.tournamentName = formValues.tournamentName;

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
    this.starLevel = formValues.starLevel;

    this.requestContents.applyChanges(formValues);
    this.requestContentsJSON = JSON.stringify (this.requestContents);
//    console.log ('JSON length ', this.requestContentsJSON.length);
    this.requestContents = null;
  }

  fillScreenDef () {
      // convert dates from UTC to local
      let dateUtils = new DateUtils();
      this.startDate = dateUtils.convertFromUTCToLocalDate (this.startDate);
      this.endDate = dateUtils.convertFromUTCToLocalDate (this.endDate);
      this.requestDate = dateUtils.convertFromUTCToLocalDate (this.requestDate);

    let settings: any = JSON.parse (this.requestContentsJSON);
    this.requestContents = new SanctionRequestContents();
    this.requestContents.fillSettings(settings);
    this.requestContentsJSON = null;
  }
}


