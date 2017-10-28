package org.auroratms


import grails.rest.*
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_TOURNAMENT_DIRECTOR'])
class SanctionRequestController extends RestfulController {
    static responseFormats = ['json', 'xml']

    def sanctionRequestService

    SanctionRequestController() {
        super(SanctionRequest)
    }

    def search (String searchTerms, Integer max) {
        respond sanctionRequestService.search(searchTerms, max)
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        int count = countResources()
        List<SanctionRequest> results = listAllResources(params)
        def responseMap = ['count': count, 'results': results]
        respond responseMap
    }
}
