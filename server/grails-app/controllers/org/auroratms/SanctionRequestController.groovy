package org.auroratms


import grails.rest.*
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_USER')
class SanctionRequestController extends RestfulController {
    static responseFormats = ['json', 'xml']

    def sanctionRequestService

    SanctionRequestController() {
        super(SanctionRequest)
    }

    def search (String searchTerms, Integer max) {
        respond sanctionRequestService.search(searchTerms, max)
    }
}
