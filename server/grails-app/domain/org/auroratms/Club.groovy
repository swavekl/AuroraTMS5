package org.auroratms

import grails.rest.Resource

/**
 * Class for representing USATT affiliated clubs
 */
class Club {
    // club name e.g. Fox Valley Table Tennis club
    String name
    // e.g Eola Community Center
    String buildingName

    // address
    String streetAddress
    String city
    String state
    int zipCode

    String clubAdminName
    String clubAdminEmail

    // Wednesday & Friday - 6:30 - 9:30PM
    String hoursAndDates

    String clubPhoneNumber
    String clubPhoneNumber2

    String clubWebsite

    // date when USATT affiliation expires
    Date affiliationExpirationDate

    static constraints = {
        name blank: false
        buildingName nullable: true
        streetAddress blank: false
        city blank: false
        state blank: false
        zipCode nullable: false
        clubAdminName blank: false
        clubAdminEmail blank: false
        hoursAndDates blank: false
        clubPhoneNumber blank: false
        clubPhoneNumber2 nullable: true
        clubWebsite blank: false
        affiliationExpirationDate nullable: false
    }

}
