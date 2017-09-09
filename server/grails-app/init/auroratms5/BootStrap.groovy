package auroratms5

class BootStrap {

    def init = { servletContext ->
        5.times {
            new Todo(title: "Todo title + ${it}").save()
        }
    }
    def destroy = {
    }
}
