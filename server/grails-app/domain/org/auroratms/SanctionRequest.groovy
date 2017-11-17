package org.auroratms

import tournament.sanction.SanctionRequestStatus

class SanctionRequest {

    String tournamentName
    Date startDate
    Date endDate
    Date requestDate
    SanctionRequestStatus status

//    Date alternateStartDate
//    Date alternateEndDate
//
//    String webLinkURL
//
//    String venueStreetAddress
//    String venueCity
//    String venueState
//    String venueZipCode
//
//    String clubName
//    Date clubAffiliationExpiration
//
//    String contactPersonName
//    String contactPersonPhone

    // contents of the request in JSON format
    // this should enable us to modify this request in the future without having to modify the database schema
    String requestContentsJSON;

    static constraints = {
        requestContentsJSON maxSize: 4000;
    }
}
