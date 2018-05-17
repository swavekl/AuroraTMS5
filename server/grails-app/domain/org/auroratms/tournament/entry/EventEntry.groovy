package org.auroratms.tournament.entry

import org.auroratms.tournament.Event

class EventEntry {

    // reserved to hold until payment is complete, to be revoked if user abandons registration
    // not selected - not chosen to enter by user
    // pending - pending payment
    // confirmed - payment went through now they have it,
    // waiting list - user chose to enter waiting list
    enum EntryStatus {
        NOT_SELECTED, PENDING, CONFIRMED, WAITING_LIST
    }

    EntryStatus status

    Date dateEntered

    enum AvailabilityStatus {
        ENTERED, AVAILABLE, FULL, WAITING_LIST, RATING, WRONG_AGE, WRONG_GENDER, TIME_CONFLICT
    }

    // a reason the event is not available - e.g. Rating, Full, Age, time conflict etc.
    AvailabilityStatus availabilityStatus

    // price per event dependent on age or other criteria
    float fee

    static transients = [ "availabilityStatus", "fee" ]

    // reference property back to TournamentEntry FK created in database, cascading saves and deletes from TournamentEntry
    static belongsTo = [tournamentEntry: TournamentEntry]

    // reference back to Event so we know which event it is (name, date and start time etc.)
    static hasOne = [event: Event]

    static constraints = {
        status blank : false
        //availabilityStatus bindable:true  // not persistent in DB, but bound value from map constructor
    }
}
