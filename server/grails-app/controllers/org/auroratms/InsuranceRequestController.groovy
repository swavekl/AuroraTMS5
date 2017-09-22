package org.auroratms

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*

@Secured(['ROLE_TOURNAMENT_DIRECTOR'])
class InsuranceRequestController extends RestfulController {
    static responseFormats = ['json', 'xml']

    InsuranceRequestController() {
        super(InsuranceRequest)
    }
}
