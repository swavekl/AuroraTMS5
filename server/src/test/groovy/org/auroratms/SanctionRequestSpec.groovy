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
        new SanctionRequest(tournamentName: 'Fox Valley Open 22', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started).save()
        new SanctionRequest(tournamentName: 'Schaumburg New Year Open 222', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Approved).save()

        expect:
        SanctionRequest.count() == 2
    }
}
