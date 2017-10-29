package org.auroratms

import grails.testing.gorm.DataTest
import grails.testing.services.ServiceUnitTest
import spock.lang.Specification
import tournament.sanction.SanctionRequestStatus

class SanctionRequestServiceSpec extends Specification implements ServiceUnitTest<SanctionRequestService>, DataTest {

    void setupSpec() {
        mockDomain SanctionRequest
    }

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        setup: 'create tournament request'
            service.create(new SanctionRequest(tournamentName: "Teams tournament", startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started))
            service.create(new SanctionRequest(tournamentName: "Fox Valley Open", startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started))
            service.create(new SanctionRequest(tournamentName: "Aurora Cup", startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started))
            service.create(new SanctionRequest(tournamentName: "Aurora Fall Open", startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started))

        when: "we search "
            def results = service.search ('Aurora', 5)

        then:"fix me"
            results.size() == 2

        when: "we search for non existent tournament"
            def results2 = service.search ("Alaska", 5)

        then:"should be empty list"
            results2.size() == 0

        when: "we search without a search term"
            def results3 = service.search (null, 5)

        then:"should be empty list"
            results3.size() == 0

        when: "we search without a search term"
            def results4 = service.search ("", 5)

        then:"should be empty list"
            results4.size() == 0
    }
}
