package org.auroratms

import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils
import tournament.insurance.InsuranceRequestStatus
import tournament.sanction.SanctionRequestStatus

class BootStrap {

    def init = { servletContext ->
        def userRole = new Role(authority: 'ROLE_USER').save()
        def tdRole = new Role(authority: 'ROLE_TOURNAMENT_DIRECTOR').save()
        //def facebookRole = new Role(authority: 'ROLE_FACEBOOK').save()
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

        new SanctionRequest(tournamentName: '2018 Aurora Cup', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Started).save(flush: true, failOnError: true)
        new SanctionRequest(tournamentName: '2018 Aurora Spring Open', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Submitted).save(flush: true, failOnError: true)
        new SanctionRequest(tournamentName: '2018 Aurora Summer Open', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Rejected).save(flush: true, failOnError: true)
        new SanctionRequest(tournamentName: '2018 Aurora Fall Open', startDate: new Date(), endDate: new Date(), status: SanctionRequestStatus.Approved).save(flush: true, failOnError: true)

        createInsuranceRequest('Swavek Lorenc', 'swaveklorenc@yahoo.com', 'Fox Valley Table Tennis Club', '2018 Aurora Spring Open', InsuranceRequestStatus.Submitted)
        createInsuranceRequest('Mario Lorenc', 'mariolorenc@yahoo.com',  'Phoenix Table Tennis Club', '2018 Phoenix Sizzler Open ', InsuranceRequestStatus.Approved)
        createInsuranceRequest('Yichi Zhang', 'zyichi1@gmail.com', 'Experior', 'Spring Experior Giant Round Robin', InsuranceRequestStatus.Rejected)
        // add some more
        25.times {
            createInsuranceRequest("(${it + 1})nth Tournament Director",
                     "tourdir${it}@gmail.com",
                    'Nice Table Tennis Club',
                    '2018 Giant Round Robin',
                    InsuranceRequestStatus.Started)
        }

        10.times {
            new Todo(title: "Todo title + ${it}").save()
        }

        Todo.withSession {
            it.flush()
            it.clear()
        }
    }
    def destroy = {
    }

    def createInsuranceRequest (String contactName, String contactPersonEmail, String orgName, String eventName, InsuranceRequestStatus status) {
        new InsuranceRequest(
                orgName: orgName,
                orgStreetAddress : "1240 E Diehl Rd",
                orgCity : "Naperville",
                orgZip : 60540,
                orgState : "IL",
                requestDate : new Date(),
                contactName: contactName,
                contactPhoneNumber: "773-878-9090",
                contactEmail: contactPersonEmail,
                certFacilityName: 'Eola Community Center',
                certPersonName : "Mike Owald",
                certPersonPhoneNumber : "630-555-4545",
                certPersonEmail : "mowald@fvpd.org",
                certStreetAddress : "555 S. Eola Rd",
                certCity : "Aurora",
                certState : "IL",
                certZip : 60504,
                eventName: eventName,
                eventStartDate: new Date(),
                eventEndDate: new Date (),
                status: status
        ).save(flush: true, failOnError: true)

    }
}
