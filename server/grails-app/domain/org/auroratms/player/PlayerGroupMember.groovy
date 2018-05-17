package org.auroratms.player

class PlayerGroupMember {

    // belongs to one group - no reference back to player group
    static hasOne = [playerGroup:PlayerGroup]

    // reference to profile so we can retrieve it
    PlayerProfile playerProfile

    static constraints = {
    }
}

