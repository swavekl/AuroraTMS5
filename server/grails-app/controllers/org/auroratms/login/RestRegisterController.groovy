package org.auroratms.login

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject

//import grails.plugin.springsecurity.authentication.dao.NullSaltSource
//import grails.plugin.springsecurity.ui.RegisterCommand
//import grails.plugin.springsecurity.ui.RegistrationCode

@Secured('permitAll')
class RestRegisterController {

    def register () {
        JSONObject jsonObject = request.JSON
        String firstName = jsonObject.getString("firstName")
        String email = jsonObject.getString("email")
        String message = "Hello $firstName, you are registered!  Please check your email to complete your registration $email"
        render([message: message] as JSON)
    }
        //extends grails.plugin.springsecurity.ui.RegisterController{

//    def register(RegisterCommand command) {
//        if (command.hasErrors()) {
//            def errors = []
//            command.errors.allErrors.each {
//                def defaultMsg = it.defaultMessage
//                def errorMsg = message(code: it, args: it.arguments)
//                errors.add(errorMsg)
//            }
//            render ([errors: errors] as JSON)
//            return
//        }
//
//        String salt = saltSource instanceof NullSaltSource ? null : command.username
//        def user = lookupUserClass().newInstance(username: command.username,
//                accountLocked: true, enabled: true)
//
//        RegistrationCode registrationCode = springSecurityUiService.register(user, command.password, salt)
//        if (registrationCode == null || registrationCode.hasErrors()) {
//            // null means problem creating the user
//            def errors = [
//                    message(code: 'spring.security.ui.register.miscError')
//            ]
//            render ([errors: errors] as JSON)
//            return
//        }
//
//        // http://gateway-pc:8080/AuroraTMS/register/verifyRegistration?t=d572cfec2a284feaa7e74bf32d6084e7
//        String url = generateLink2('verifyRegistration', [t: registrationCode.token])
//
//        def conf = SpringSecurityUtils.securityConfig
//        def body = conf.ui.register.emailBody
//        if (body.contains('$')) {
//            body = evaluate(body, [user: user, url: url])
//        }
//        try {
//            mailService.sendMail {
//                to command.email
//                from conf.ui.register.emailFrom
//                subject conf.ui.register.emailSubject
//                html body.toString()
//            }
//        } catch (Exception e) {
//            def errors = [
//                    'Failed to send registration verification email.  Reason: ' + e.getMessage()
//            ]
//            render ([errors: errors] as JSON)
//            return
//        }
//
//        render ([emailSent: true] as JSON)
//
//    }
//
//    /**
//     *
//     * @return
//     */
//    def restVerify () {
//        def conf = SpringSecurityUtils.securityConfig
//        String defaultTargetUrl = conf.successHandler.defaultTargetUrl
//
//        String token = params.t
//
//        def registrationCode = token ? RegistrationCode.findByToken(token) : null
//        if (!registrationCode) {
//            def errors = [
//                    message(code: 'spring.security.ui.register.badCode')
//            ]
//            render ([errors: errors] as JSON)
//            return
//        }
//
//        def user
//        // TODO to ui service
//        RegistrationCode.withTransaction { status ->
//            String usernameFieldName = SpringSecurityUtils.securityConfig.userLookup.usernamePropertyName
//            user = lookupUserClass().findWhere((usernameFieldName): registrationCode.username)
//            if (!user) {
//                return
//            }
//            user.accountLocked = false
//            user.save(flush:true)
//            def UserRole = lookupUserRoleClass()
//            def Role = lookupRoleClass()
//            for (roleName in conf.ui.register.defaultRoleNames) {
//                UserRole.create user, Role.findByAuthority(roleName)
//            }
//            registrationCode.delete()
//        }
//
//        if (!user) {
//            def errors = [
//                    message(code: 'spring.security.ui.register.badCode')
//            ]
//            render ([errors: errors] as JSON)
//            return
//        }
//
//        springSecurityService.reauthenticate user.email
//
//        // redirect to this URL which will immediately pull the new URL
//        String url = "$request.scheme://$request.serverName:$request.serverPort$request.contextPath"
//        url += '/login?redirectTo=/profile'
////        String scriptCode = "<script>window.location.href='" + url + "'</script>"
////        render(contentType: 'text/html', text: scriptCode)
////        render ([redirectURL: url] as JSON)
//        redirect(url: url)
//    }
//
//    protected String generateLink2(String action, linkParams) {
//        createLink(base: "$request.scheme://$request.serverName:$request.serverPort$request.contextPath",
//                controller: 'restRegister', action: action, params: linkParams)
//    }
}
