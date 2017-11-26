package org.auroratms

import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils
import tournament.insurance.InsuranceRequestStatus
import tournament.sanction.SanctionRequestStatus

import java.text.DateFormat
import java.text.SimpleDateFormat

class BootStrap {

    def init = { servletContext ->
        // make all dates saved in this timezone
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))

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

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-DD");
        createClub('Fox Valley Table Tennis Club', 'Eola Community Center', dateFormat.parse('2017-10-31'), '555 S. Eola Rd', 'Aurora','IL', 60504)
        createClub('Schaumburg Table Tennis Club', 'Community Recreation Center', dateFormat.parse('2017-05-31'), '505 N Springingsguth Rd.', 'Schaumburg','IL', 60609)
        createClub('Edge Table Tennis Club', null, dateFormat.parse('2017-11-31'), '318 E Golf Rd', 'Arlington Heights','IL', 60609)
        createClub('Experior Table Tennis Club', null, dateFormat.parse('2017-12-31'), '111 S Lombard Rd Unit 8', 'Addison','IL', 60101)
        750.times {
            createClub("Chicago Table Tennis Club ${it + 1}", null, dateFormat.parse('2017-12-31'), '2400 Chestnut Ave', 'Glenview','IL', 60101)
        }

        createSanctionRequest( '2018 Aurora Cup',  new Date(), new Date(), SanctionRequestStatus.Started, new Date(), 4)
        createSanctionRequest( '2018 Aurora Spring Open',  new Date(), new Date(), SanctionRequestStatus.Submitted, new Date(), 2)
        createSanctionRequest( '2018 Aurora Summer Open',  new Date(), new Date(), SanctionRequestStatus.Rejected, new Date(), 2)
        createSanctionRequest( '2018 Aurora Fall Open',  new Date(), new Date(), SanctionRequestStatus.Approved, new Date(), 2)

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

    def createClub(String clubName, String buildingName, Date affiliationExpirationDate, String streetAddress, String city, String state, Integer zipCode) {
        new Club(
                name: clubName,
                buildingName: buildingName,
                streetAddress: streetAddress,
                city: city,
                state: state,
                zipCode: zipCode,
                clubAdminName: 'Swavek Lorenc',
                clubAdminEmail: 's@abc.com',
                hoursAndDates: 'Wednesday & Friday - 6:30 - 9:30PM',
                clubPhoneNumber : '630-111-2222',
                clubPhoneNumber2 : null,
                clubWebsite : 'https://www.fvttc.org',
                affiliationExpirationDate: affiliationExpirationDate)
                .save(flush: true, failOnError: true)
    }

    def createSanctionRequest(String tournamentName, Date startDate, Date endDate, SanctionRequestStatus status, Date requestDate, int starLevel) {
        new SanctionRequest(tournamentName: tournamentName,
                startDate: startDate,
                endDate: endDate,
                status: status,
                requestDate: requestDate,
                starLevel: starLevel,
                requestContentsJSON: "{}")
                .save(flush: true, failOnError: true)
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

    def destroy = {
    }

}
