package org.auroratms.tournament.entry

import org.auroratms.FinancialTransaction
import org.auroratms.tournament.Tournament

class TournamentEntry {

    // date user entered the tournament
    Date dateEntered

    // rating as of the Tournament.ratingCutoffDate date  it may go up after that date but will not effect eligibility for entered events
    // can be null i.e. unrated
    int eligibilityRating

    // current rating used for seeding within events
    int seedRating

    // selected USATT membership option (from 1 through 8)
    int membershipOption

    // reference back to Tournament, but cascading saves and deletes
    static belongsTo = [tournament:Tournament]

    // collection of tournament entries and financial transactions (payments, refunds)
    static hasMany = [eventEntries: EventEntry, financialTransactions: FinancialTransaction]

    static constraints = {
        eligibilityRating nullable: true
        seedRating nullable: true
    }
}
