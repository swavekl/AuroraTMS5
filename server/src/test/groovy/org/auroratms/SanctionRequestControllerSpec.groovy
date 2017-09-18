package org.auroratms

import grails.testing.gorm.DataTest
import grails.testing.web.controllers.ControllerUnitTest
import spock.lang.Specification

class SanctionRequestControllerSpec extends Specification implements ControllerUnitTest<SanctionRequestController>, DataTest {

    static doWithSpring = {
        jsonSmartViewResolver(JsonViewResolver)
    }

    void setupSpec() {
        mockDomain SanctionRequest
    }

    void setup () {
        SanctionRequest.saveAll (
                new SanctionRequest(tournamentName: 'Fox Valley Open'),
                new SanctionRequest(tournamentName: 'Schaumburg New Year Open')
        )
    }

    void "test action which invokes GORM method"() {
        when:
        controller.index()

        then:
        status == 200
//        response.json.size() == 2
//        model.keySet().contains('people')

//        when: 'A query is executed that finds results'
//            controller.search('Fox', 10)
//
//        then: 'The response is correct'
//            response.json.size() == 1
//            response.json[0].tournamentName == 'Fox Valley Open'
    }
}

