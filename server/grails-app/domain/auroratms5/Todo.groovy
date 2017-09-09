package auroratms5

import grails.rest.Resource

@Resource(readOnly = false, formats = ['json'])
class Todo {
    String title
    Boolean completed = false

    static constraints = {
    }
}
