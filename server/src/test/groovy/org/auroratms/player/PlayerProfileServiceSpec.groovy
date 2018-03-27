package org.auroratms.player

import grails.testing.gorm.DataTest
import grails.testing.mixin.integration.Integration
import grails.testing.services.ServiceUnitTest
import grails.transaction.Rollback
import org.auroratms.Role
import org.auroratms.User
import org.auroratms.UserRole
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder as SCH
import player.Gender
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@Rollback
@Integration
class PlayerProfileServiceSpec extends Specification {
//class PlayerProfileServiceSpec extends Specification implements ServiceUnitTest<PlayerProfileServiceSpec>, DataTest {

    @Autowired
    PlayerProfileService playerProfileService
//    PlayerProfileService playerProfileService
//    def playerProfileService

//    void setupSpec() {
//        mockDomain PlayerProfile
//    }

    def setup() {
        createUsers()
    }

    def cleanup() {
    }

    private void createUsers() {
        def roleAdmin = new Role(authority: 'ROLE_ADMIN').save()
        def roleUser = new Role(authority: 'ROLE_USER').save()

        def user = new User(username: "testuser", password: "testuser123").save()
        def admin = new User(username: 'admin', password: 'admin123').save()

        UserRole.create user, roleUser
        UserRole.create admin, roleAdmin

        def admins = UserRole.findAllByRole(roleAdmin)
        println "admins = $admins"

    }

    private void loginAsAdmin() {
        // have to be authenticated as an admin to create ACLs
        SCH.context.authentication = new UsernamePasswordAuthenticationToken(
                'admin', 'admin123',
                AuthorityUtils.createAuthorityList('ROLE_ADMIN'))
    }

    private void loginAsUser() {
        // have to be authenticated as an admin to create ACLs
        SCH.context.authentication = new UsernamePasswordAuthenticationToken(
                'testuser', 'testuser123',
                AuthorityUtils.createAuthorityList('ROLE_USER'))
    }

    void "test profile create by user"() {
        when:
        loginAsUser()

        then:
        PlayerProfile testPlayerProfile = new PlayerProfile(
                firstName : 'Jacob',
                lastName : 'Dennizen',
                dateOfBirth : new Date().parse("MM.dd.yyy", '05.18.1988'),
                gender : Gender.Male.toString(),
                email : 'jdennizen@auroratms.com',
                phone : '630-111-2222',
                streetAddress : '123 Nice Ave',
                city : 'Aurora',
                state : 'IL',
                zipCode : '60503',
                country : 'USA',
                expirationDate : new Date().parse("MM.dd.yyy", '07.31.2018')
        )
        def playerProfile = service.create (testPlayerProfile)

//        when:
//        loginAsAdmin()
//
//        then:
        PlayerProfile playerProfile2 = service.get playerProfile.id
        playerProfile2.firstName == 'Jacob'
        println "playerProfile2 = $playerProfile2"
    }
}
