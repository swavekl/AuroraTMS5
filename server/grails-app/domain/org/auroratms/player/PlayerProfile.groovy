package org.auroratms.player

import org.auroratms.User
import player.Gender

class PlayerProfile {

    String firstName
    String lastName
    Date dateOfBirth

    // USATT membership information
    long usattID
    Date expirationDate

    // contact information
    String email
    String phone
    String streetAddress
    String city
    String state
    String zipCode
    String country
    Gender gender
    // String club


    // no reference to User
    static belongsTo = User

    //static hasMany = [tournamentEntries: TournamentEntry]

    // reference back to group member
    static hasOne = [playerGroupMember: PlayerGroupMember]

    static constraints = {
        firstName blank: false, maxSize: 384
        lastName blank: false, maxSize: 384
        dateOfBirth blank: false
        gender blank: false
        email blank: false, maxSize: 384
        phone blank: false, maxSize: 384
        streetAddress blank: false, maxSize: 384
        city blank: false, maxSize: 384
        state blank: false
        zipCode blank: false
        country blank: false, maxSize: 384
        expirationDate nullable: true
        playerGroupMember nullable: true
    }
}
