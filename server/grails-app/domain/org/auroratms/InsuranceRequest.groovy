package org.auroratms

import tournament.insurance.InsuranceRequestStatus

class InsuranceRequest {
    String orgName;
    String orgStreetAddress
    String orgCity
    Integer orgZip
    String orgState

    Date reqDate
    // person filling out the request
    String contactName
    String contactPhoneNumber
    String contactEmail

    // certificate holder data
    String certFacilityName
    String certPersonName
    String certPersonPhoneNumber
    String certPersonEmail
    String certStreetAddress
    String certCity
    String certState
    Integer certZip

    String eventName
    Date eventStartDate
    Date eventEndDate

    // request status - started, submitted, approved, rejected
    InsuranceRequestStatus status;

    static constraints = {
        eventEndDate nullable:true
    }
}
