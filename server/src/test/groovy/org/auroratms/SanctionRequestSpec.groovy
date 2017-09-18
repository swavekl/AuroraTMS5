package org.auroratms

import grails.testing.gorm.DomainUnitTest
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Stepwise

@Stepwise
class SanctionRequestSpec extends Specification implements DomainUnitTest<SanctionRequest> {

    @Shared
    int id

    void "test basic persistence mocking"() {
        setup:
        new SanctionRequest(tournamentName: 'Fox Valley Open 22').save()
        new SanctionRequest(tournamentName: 'Schaumburg New Year Open 222').save()

        expect:
        SanctionRequest.count() == 2
    }
}
