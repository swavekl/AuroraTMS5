package org.auroratms

import tournament.sanction.SanctionRequestStatus

class SanctionRequest {

    String tournamentName
    Date startDate
    Date endDate
    Date requestDate
    SanctionRequestStatus status
    int starLevel

    // regional or national coordinator
    String coordinatorFirstName
    String coordinatorLastName

    // email retrieved from frontend table
    String coordinatorEmail

    // contents of the request in JSON format
    // this should enable us to modify this request in the future without having to modify the database schema
    String requestContentsJSON;

    static constraints = {
        tournamentName blank: false
        startDate nullable: false
        endDate nullable: false
        starLevel range: 0..5
        coordinatorFirstName nullable: true
        coordinatorLastName nullable: true
        coordinatorEmail nullable: true
        requestContentsJSON maxSize: 4000
    }
}
