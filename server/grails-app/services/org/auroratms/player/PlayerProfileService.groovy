package org.auroratms.player

import grails.gorm.PagedResultList
import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.acl.AclService
import grails.plugin.springsecurity.acl.AclUtilService
import grails.transaction.Transactional
import org.auroratms.Club
import org.auroratms.Role
import org.auroratms.User
import org.auroratms.UserRole
import org.springframework.security.access.prepost.PostFilter
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.acls.domain.BasePermission
import org.springframework.security.acls.domain.DefaultPermissionFactory
import org.springframework.security.acls.model.AccessControlEntry
import org.springframework.security.acls.model.MutableAcl
import org.springframework.security.acls.model.Sid

import java.security.acl.Permission
//import grails.compiler.GrailsCompileStatic

//@GrailsCompileStatic
class PlayerProfileService {

    DefaultPermissionFactory aclPermissionFactory
    AclService aclService
    AclUtilService aclUtilService
    SpringSecurityService springSecurityService

    void addPermission(PlayerProfile playerProfile, String username, int permission) {
        addPermission playerProfile, username, aclPermissionFactory.buildFromMask(permission)
    }

    @PreAuthorize("hasPermission(#playerProfile, admin)")
    @Transactional
    void addPermission(PlayerProfile playerProfile, String username, BasePermission permission) {
        aclUtilService.addPermission playerProfile, username, permission
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @Transactional
    def create(PlayerProfile playerProfile) {
        playerProfile.save(flush: true)
        println "granting ownership to user " + springSecurityService.authentication.name
        // Grant the current principal administrative permission
        addPermission playerProfile, springSecurityService.authentication.name, BasePermission.ADMINISTRATION

        def allUsers = User.findAll()
        def adminRole = Role.findByAuthority("ROLE_ADMIN")
        def admins = UserRole.findAllByRole(adminRole).secUser
        admins.each {
            if (it.username != springSecurityService.authentication.name) {
                println 'granting access to ADMIN ' + it.username
                addPermission playerProfile, it.username, BasePermission.ADMINISTRATION
            }
        }

        playerProfile
    }

    @PreAuthorize('hasPermission(#id, "org.auroratms.player.PlayerProfile", read) or hasPermission(#id, "org.auroratms.player.PlayerProfile", admin)')
    PlayerProfile get(long id) {
        PlayerProfile.get id
    }

    @PreAuthorize('hasRole("ROLE_USER")')
    @PostFilter('hasPermission(filterObject, read) or hasPermission(filterObject, admin)')
    PagedResultList search (String firstName, String lastName, Integer usattId, Integer max) {

        def query = (usattId == 0) ? PlayerProfile.where {
            firstName == "${firstName}" && lastName == "${lastName}"
        } : PlayerProfile.where {
            (usattID == usattId)
        }
        query.list(max: Math.min( max ?: 10, 100))
    }

    @PreAuthorize('hasRole("ROLE_USER")')
    @PostFilter('hasPermission(filterObject, read) or hasPermission(filterObject, admin)')
    List<PlayerProfile> list(Map params) {
        PlayerProfile.list params
    }

    int count() {
        PlayerProfile.count()
    }

    @Transactional
    @PreAuthorize('hasPermission(#playerProfile, write) or hasPermission(#playerProfile, admin)')
    void update(PlayerProfile playerProfile) {
        playerProfile.save(flush: true)
    }

    @Transactional
    @PreAuthorize('hasPermission(#playerProfile, delete) or hasPermission(#playerProfile, admin)')
    void delete(PlayerProfile playerProfile) {
        playerProfile.delete()

        // Delete the ACL information as well
        aclUtilService.deleteAcl playerProfile
    }

    @Transactional
    @PreAuthorize('hasPermission(#playerProfile, admin)')
    void deletePermission(PlayerProfile playerProfile, Sid recipient, Permission permission) {
        MutableAcl acl = (MutableAcl)aclUtilService.readAcl(playerProfile)

        // Remove all permissions associated with this particular
        // recipient (string equality to KISS)
        acl.entries.eachWithIndex { AccessControlEntry entry, int i ->
            if (entry.sid == recipient && entry.permission == permission) {
                acl.deleteAce i
            }
        }

        aclService.updateAcl acl
    }

}
