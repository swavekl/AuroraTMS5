package org.auroratms

class UrlMappings {

    static mappings = {
        '/api/insurancerequest'(resources: 'insuranceRequest')

        '/api/sanctionrequest'(resources: 'sanctionRequest') {
            collection {
                get '/search'(controller: 'sanctionRequest', action: 'search')
            }
        }

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
