package org.auroratms

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_TOURNAMENT_DIRECTOR'])
class ClubController extends RestfulController {
    static responseFormats = ['json', 'xml']

    ClubController() {
        super(Club)
    }

    def search (String searchTerms, Integer max) {
        def query = Club.where {
            name ==~ "%${searchTerms}%"
        }
        int count = query.count()
        List<Club> results = query.list(max: Math.min( max ?: 10, 100))
        def responseMap = ['count': count, 'results': results]
        respond responseMap
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        int count = countResources()
        List<Club> results = listAllResources(params)
        def responseMap = ['count': count, 'results': results]
        respond responseMap
    }
}
