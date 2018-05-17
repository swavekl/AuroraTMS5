package org.auroratms

import grails.transaction.Transactional

@Transactional
class SanctionRequestService {

    def create (SanctionRequest sr) {
        sr.save(flush: true, failOnError: true)
    }

    def search (String searchTerms, Integer max) {
        if (searchTerms) {
            def query = SanctionRequest.where {
                tournamentName ==~ "%${searchTerms}%"
            }
            return query.list(max: Math.min( max ?: 10, 100))
        }
        else {
            return []
        }
    }
}
