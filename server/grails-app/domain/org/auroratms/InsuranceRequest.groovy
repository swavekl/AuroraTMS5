package org.auroratms

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

    static constraints = {
    }
}
