package org.auroratms

import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils

class BootStrap {

    def init = { servletContext ->
        def userRole = new Role(authority: 'ROLE_USER').save()
        def tdRole = new Role(authority: 'ROLE_TOURNAMENT_DIRECTOR').save()
        def facebookRole = new Role(authority: 'ROLE_FACEBOOK').save()
        SpringSecurityUtils.clientRegisterFilter("corsFilter", SecurityFilterPosition.SECURITY_CONTEXT_FILTER.order - 1)

        def swavek = new User(username: 'swaveklorenc@yahoo.com', password: 'swavek').save()
        def yichi = new User(username: 'yzhang2@mc.com', password: 'yichi').save()

        UserRole.create swavek, userRole
        UserRole.create swavek, tdRole

        UserRole.create yichi, userRole
        UserRole.create yichi, tdRole

        UserRole.withSession {
            it.flush()
            it.clear()
        }

        new SanctionRequest(tournamentName: '2018 Aurora Cup', startDate: new Date(), endDate: new Date()).save()
        new SanctionRequest(tournamentName: '2018 Aurora Spring Open', startDate: new Date(), endDate: new Date()).save()
        new SanctionRequest(tournamentName: '2018 Aurora Summer Open', startDate: new Date(), endDate: new Date()).save()
        new SanctionRequest(tournamentName: '2018 Aurora Fall Open', startDate: new Date(), endDate: new Date()).save()

        new InsuranceRequest(contactName: 'Swavek Lorenc', contactEmail: 'swaveklorenc@yahoo.com').save()
        new InsuranceRequest(contactName: 'Mario Lorenc', contactEmail: 'mariolorenc@yahoo.com').save()
        new InsuranceRequest(contactName: 'Yichi Zhang', contactEmail: 'zyichi1@gmail.com').save()
        // add some more
        25.times {
            new InsuranceRequest(contactName: "(${it + 1})nth Tournament Director", contactEmail: "tourdir${it}@gmail.com").save()
        }

        5.times {
            new Todo(title: "Todo title + ${it}").save()
        }

        Todo.withSession {
            it.flush()
            it.clear()
        }
    }
    def destroy = {
    }
}
