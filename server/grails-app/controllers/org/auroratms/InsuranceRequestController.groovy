package org.auroratms

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*

@Secured(['ROLE_TOURNAMENT_DIRECTOR'])
class InsuranceRequestController extends RestfulController {
    static responseFormats = ['json', 'xml']

    InsuranceRequestController() {
        super(InsuranceRequest)
    }

    /**
     * Lists all resources up to the given maximum
     *
     * @param max The maximum
     * @return A list of resources
     */
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        int count = countResources()
        List<InsuranceRequest> results = listAllResources(params)
        def responseMap = ['count': count, 'results': results]
        respond responseMap
    }

}
