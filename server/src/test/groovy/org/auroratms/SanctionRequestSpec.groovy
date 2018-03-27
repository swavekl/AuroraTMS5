package org.auroratms

import grails.testing.gorm.DomainUnitTest
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Stepwise
import tournament.sanction.SanctionRequestStatus

@Stepwise
class SanctionRequestSpec extends Specification implements DomainUnitTest<SanctionRequest> {

    @Shared
    int id

    void "test basic persistence mocking"() {
        setup:
        new SanctionRequest(tournamentName: 'Fox Valley Open 22', startDate: new Date(), endDate: new Date(), requestDate: new Date(), requestContentsJSON: '{}', status: SanctionRequestStatus.Started).save(failOnError: true)
        new SanctionRequest(tournamentName: 'Schaumburg New Year Open 222', startDate: new Date(), endDate: new Date(), requestDate: new Date(), requestContentsJSON: '{}', status: SanctionRequestStatus.Approved).save(failOnError: true)

        expect:
        SanctionRequest.count() == 2
    }
}
