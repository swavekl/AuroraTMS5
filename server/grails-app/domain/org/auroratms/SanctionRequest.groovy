package org.auroratms

import tournament.sanction.SanctionRequestStatus

class SanctionRequest {

    String tournamentName
    Date startDate
    Date endDate
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

    static constraints = {
    }
}
