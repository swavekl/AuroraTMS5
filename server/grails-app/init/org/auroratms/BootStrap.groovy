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

        createInsuranceRequest('Swavek Lorenc', 'swaveklorenc@yahoo.com', 'Fox Valley Table Tennis Club')
        createInsuranceRequest('Mario Lorenc', 'mariolorenc@yahoo.com',  'Phoenix Table Tennis Club')
        createInsuranceRequest('Yichi Zhang', 'zyichi1@gmail.com', 'Experior')
        // add some more
        25.times {
            createInsuranceRequest("(${it + 1})nth Tournament Director",
                     "tourdir${it}@gmail.com",
             'Nice Table Tennis Club')
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

    def createInsuranceRequest (String name, String email, String orgName) {
        new InsuranceRequest(contactName: name, contactEmail: email, orgName: orgName,
                orgStreetAddress : "1240 E Diehl Rd",
                orgCity : "Naperville",
                orgZip : 60540,
                orgState : "IL",
                reqDate : new Date(),
                personName : "Ruchi",
                phoneNumber : "333333333",
                email : "abc@def.com",
                certStreetAddress : "1240 E Diehl Rd",
                certCity : "Naperville",
                certZip : 60540
        ).save()

    }
}
