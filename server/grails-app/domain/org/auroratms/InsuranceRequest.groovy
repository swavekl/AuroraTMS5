package org.auroratms

import tournament.insurance.AdditionalInsuredRole
import tournament.insurance.InsuranceRequestStatus

class InsuranceRequest {
    String orgName;
    String orgStreetAddress
    String orgCity
    Integer orgZip
    String orgState

    Date requestDate
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

    boolean isAdditionalInsured = false
    String additionalInsuredName

    AdditionalInsuredRole additionalInsuredRole = AdditionalInsuredRole.None;
    String otherRoleDescription

    // request status - started, submitted, approved, rejected
    InsuranceRequestStatus status;

    static constraints = {
        eventEndDate nullable:true
        additionalInsuredName nullable: true
        otherRoleDescription nullable: true
    }
}
