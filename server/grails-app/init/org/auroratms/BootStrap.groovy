package org.auroratms

class BootStrap {

    def init = { servletContext ->
        def userRole = new Role(authority: 'ROLE_USER').save()
        def tdRole = new Role(authority: 'ROLE_TOURNAMENT_DIRECTOR').save()

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

        new SanctionRequest(tournamentName: '2018 Aurora Cup').save()
        new SanctionRequest(tournamentName: '2018 Aurora Spring Open').save()
        new SanctionRequest(tournamentName: '2018 Aurora Summer Open').save()
        new SanctionRequest(tournamentName: '2018 Aurora Fall Open').save()

        5.times {
            new Todo(title: "Todo title + ${it}").save()
        }
    }
    def destroy = {
    }
}
