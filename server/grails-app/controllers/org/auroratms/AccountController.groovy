package org.auroratms

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

@Secured(['ROLE_USER'])
class AccountController extends RestfulController {
    static responseFormats = ['json', 'xml']
    AccountController() {
        super(Account)
    }

    def system () {
        Account response = Account.findBySystem(true)
        if (response) {
            // make a copy so we don't alter the original
            response = new Account(response.properties)
            // keep secret key secret
            response.stripeSecretKey = null
        }
        respond response
    }
}
