package org.auroratms
/**
 * Class for representing USATT affiliated clubs
 */
class Club {
    // club name e.g. Fox Valley Table Tennis club
    String name
    // e.g Eola Community Center
    String buildingName

    // playing site address
    String streetAddress
    String city
    String state
    // 5 or Zip+4 code
    String zipCode

    // mailing site address
    String mailingCorrespondentsName
    String mailingStreetAddress
    String mailingCity
    String mailingState
    // 5 or Zip+4 code
    String mailingZipCode

    String clubAdminName
    String clubAdminEmail

    // Wednesday & Friday - 6:30 - 9:30PM
    String hoursAndDates

    String clubPhoneNumber
    String clubPhoneNumber2

    String clubWebsite

    // date when USATT affiliation expires
    Date affiliationExpirationDate

    // Club officers (president, vice-president, secretary, treasurer)
    String presidentName
    String presidentEmail
    String presidentPhoneNumber

    String vicePresidentName
    String vicePresidentEmail
    String vicePresidentPhoneNumber

    String secretaryName
    String secretaryEmail
    String secretaryPhoneNumber

    String treasurerName
    String treasurerEmail
    String treasurerPhoneNumber

    boolean hasMembershipStructure
    String membershipStructure

    int membersCount
    int tablesCount

    String programs
    boolean hasBankAccount

    static constraints = {
        name blank: false
        buildingName nullable: true
        streetAddress nullable: true
        city nullable: true
        state nullable: true
        zipCode nullable: true
        mailingCorrespondentsName nullable: true
        mailingStreetAddress nullable: true
        mailingCity nullable: true
        mailingState nullable: true
        mailingZipCode nullable: true
        clubAdminName nullable: true
        clubAdminEmail nullable: true
        hoursAndDates nullable: true
        clubPhoneNumber nullable: true
        clubPhoneNumber2 nullable: true
        clubWebsite nullable: true
        affiliationExpirationDate nullable: false
        
        presidentName nullable: true
        presidentEmail nullable: true
        presidentPhoneNumber nullable: true

        vicePresidentName nullable: true
        vicePresidentEmail nullable: true
        vicePresidentPhoneNumber nullable: true

        secretaryName nullable: true
        secretaryEmail nullable: true
        secretaryPhoneNumber nullable: true

        treasurerName nullable: true
        treasurerEmail nullable: true
        treasurerPhoneNumber nullable: true

        hasMembershipStructure nullable: true
        membershipStructure nullable: true

        membersCount nullable: true
        tablesCount nullable: true

        programs nullable: true
        hasBankAccount nullable: true
    }
}
