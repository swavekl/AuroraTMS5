package org.auroratms

class InsuranceRequest {
    String contactName
    String contactEmail
    String orgName = "Fox Valley"
    String orgStreetAddress = "1240 E Diehl Rd"
    String orgCity = "Naperville"
    String orgZip = 60540
    String orgState = "IL"
    Date reqDate
    String personName = "Ruchi"
    String phoneNumber = "333333333"
    String email = "abc@def.com"
    String certStreetAddress = "1240 E Diehl Rd"
    String certCity = "Naperville"
    Number certZip = 60540

    static constraints = {
    }
}
