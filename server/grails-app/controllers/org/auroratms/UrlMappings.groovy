package org.auroratms

class UrlMappings {

    static mappings = {
        '/api/playerprofile'(resources: 'playerProfile') {
            collection {
                get '/search'(controller: 'playerProfile', action: 'search')
            }
        }

            '/api/insurancerequest'(resources: 'insuranceRequest')

        '/api/sanctionrequest'(resources: 'sanctionRequest') {
            collection {
                get '/search'(controller: 'sanctionRequest', action: 'search')
            }
        }

        '/api/club'(resources: 'club') {
            collection {
                get '/search'(controller: 'club', action: 'search')
            }
        }

        '/api/register' (controller: 'restRegister', action:'register', method: 'POST')
        '/api/register/verify' (controller: 'restRegister', action:'verifyRegistration', method: 'GET')

        '/api/financialtransaction' (resources: 'financialTransaction')

        '/api/account'(resources: 'account') {
            collection {
                get '/system' (controller: 'account', action: 'system')
            }
        }

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
