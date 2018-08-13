package org.auroratms.player

import grails.gorm.PagedResultList
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*
import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import org.auroratms.Club

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.OK

@Secured(['ROLE_USER','ROLE_TOURNAMENT_DIRECTOR','ROLE_ADMIN'])
class PlayerProfileController extends RestfulController {

    PlayerProfileService playerProfileService

    static responseFormats = ['json', 'xml']

    PlayerProfileController() {
        super(PlayerProfile)
    }

    /**
     * Searches by either
     * @param firstName
     * @param lastName
     * @param usattId
     * @param max
     * @return
     */
    def search (String firstName, String lastName, Integer usattId, Integer max) {
        PagedResultList results = playerProfileService.search(firstName, lastName, usattId, max);
        def count = results.getTotalCount()
        def list = results.resultList
        def responseMap = ['count': count, 'results': list]
        respond responseMap;
    }

    /**
     * Saves a resource
     */
    @Transactional
    def save() {
        if(handleReadOnly()) {
            return
        }
        PlayerProfile instance = createResource() as PlayerProfile

        instance.validate()
        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view:'create' // STATUS CODE 422
            return
        }

        //saveResource instance
        playerProfileService.create (instance)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [classMessageArg, instance.id])
                redirect instance
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null ))
                respond instance, [status: CREATED, view:'show']
            }
        }
    }

    /**
     * Updates a resource for the given id
     * @param id
     */
    @Transactional
    def update() {
        if(handleReadOnly()) {
            return
        }

        PlayerProfile instance = queryForResource(params.id) as PlayerProfile
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        instance.properties = getObjectToBind()

        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view:'edit' // STATUS CODE 422
            return
        }

        //updateResource instance
        playerProfileService.update instance

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [classMessageArg, instance.id])
                redirect instance
            }
            '*'{
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null ))
                respond instance, [status: OK]
            }
        }
    }


}
