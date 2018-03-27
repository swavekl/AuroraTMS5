package org.auroratms.player

import grails.plugins.rest.client.RestBuilder
import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import org.apache.http.HttpStatus
import player.Gender
import spock.lang.Shared
import spock.lang.Specification

@SuppressWarnings(['MethodName', 'DuplicateNumberLiteral'])
@Integration
@Rollback
class PlayerProfileControllerSpec extends Specification {

    def hostPart = "https://gateway-pc:"
    def serviceEndpoint = "/api/playerprofile"
    def loginEndpoint = "/api/login"

    @Shared RestBuilder rest = new RestBuilder()

    def setup() {
//        Student.saveAll(
//                new Student(name: 'Nirav', grade: 100),
//                new Student(name: 'Jeff', grade: 95),
//                new Student(name: 'Sergio', grade: 90),
//        )
    }

    def 'test /api/playerprofile url is secured'() {
//        given:
//        RestBuilder rest = new RestBuilder()

        when:
        def serviceUrl = hostPart + "${serverPort}" + serviceEndpoint
        def resp = rest.get(serviceUrl, {
            accept('application/json')
            contentType('application/json')
        })

        then:
        resp.status == 401
        resp.json.status == 401
        resp.json.error == 'Unauthorized'
        resp.json.message == 'No message available'
        resp.json.path == serviceEndpoint
    }

    def "test a user with the role ROLE_TOURNAMENT_DIRECTOR is able to access /api/playerprofile url"() {
        when: 'login with the yichi'
//        RestBuilder rest = new RestBuilder()
        def loginUrl = hostPart + "${serverPort}" + loginEndpoint
        def resp = rest.post(loginUrl) {
            accept('application/json')
            contentType('application/json')
            json {
                username = 'yzhang2@mc.com'
                password = 'yichi'
            }
        }

        then:
        resp.status == 200
        resp.json.roles.find { it == 'ROLE_TOURNAMENT_DIRECTOR' }

        when:
        def accessToken = resp.json.access_token

        then:
        accessToken

        when:
        def serviceUrl = hostPart + "${serverPort}" + serviceEndpoint
        resp = rest.get(serviceUrl) {
            accept('application/json')
            header('Authorization', "Bearer ${accessToken}")
        }

        then:
        resp.status == 200
    }

    def "test a user with the role ROLE_USER is able to access /api/playerprofile url"() {
        when: 'login with the watson'
//        RestBuilder rest = new RestBuilder()
        def loginUrl = hostPart + "${serverPort}" + loginEndpoint
        def resp = rest.post(loginUrl) {
            accept('application/json')
            contentType('application/json')
            json {
                username = 'apitestuser@gmail.com'
                password = 'apitestuser'
            }
        }

        then:
        resp.status == HttpStatus.SC_OK
        resp.json.roles.find { it == 'ROLE_USER' }

        when:
        def accessToken = resp.json.access_token

        then:
        accessToken

        when:
        def serviceUrl = hostPart + "${serverPort}" + serviceEndpoint
        resp = rest.get(serviceUrl) {
            accept('application/json')
            header('Authorization', "Bearer ${accessToken}")
        }

        then:
        resp.status == HttpStatus.SC_OK

    }

    def "test creation by ROLE_USER"() {
        when: 'login as test user'
//        RestBuilder rest = new RestBuilder()
        def loginUrl = hostPart + "${serverPort}" + loginEndpoint
        def resp = rest.post(loginUrl) {
            accept('application/json')
            contentType('application/json')
            json {
                username = 'apitestuser@gmail.com'
                password = 'apitestuser'
            }
        }
        then:
        resp.status == 200

        when:
        def accessToken = resp.json.access_token

        then:
        accessToken

        when:
        def serviceUrl = hostPart + "${serverPort}" + serviceEndpoint
        Date dob = new Date().parse("MM.dd.yyy", '05.18.1988')
        Date dexp = new Date().parse("MM.dd.yyy", '07.31.2018')
        resp = rest.post(serviceUrl) {
            accept('application/json')
            header('Authorization', "Bearer ${accessToken}")
            json {
                firstName = 'Jacob'
                lastName = 'Dennizen'
                dateOfBirth = dob
                gender = Gender.Male.toString()
                email = 'jdennizen@auroratms.com'
                phone = '630-111-2222'
                streetAddress = '123 Nice Ave'
                city = 'Aurora'
                state = 'IL'
                zipCode = '60503'
                country = 'USA'
                expirationDate = dexp
            }
        }

        then:
        //println "resp = $resp.body"
        resp.status == HttpStatus.SC_CREATED

    }
}

