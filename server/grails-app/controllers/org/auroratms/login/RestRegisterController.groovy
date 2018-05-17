package org.auroratms.login

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.plugin.springsecurity.authentication.dao.NullSaltSource
import grails.plugin.springsecurity.ui.RegisterCommand
import grails.plugin.springsecurity.ui.RegisterController
import grails.plugin.springsecurity.ui.RegistrationCode
import org.grails.web.json.JSONObject
import org.springframework.http.HttpStatus

@Secured('permitAll')
class RestRegisterController extends RegisterController {

    def register() {

        JSONObject jsonObject = request.JSON
        String firstName = jsonObject.getString("firstname")
        String lastName = jsonObject.getString("lastname")
        String email = jsonObject.getString("email")
        def username = email;
        String password = jsonObject.getString("password")
        String password2 = jsonObject.getString("password2")

        RegisterCommand registerCommand = new RegisterCommand(username: username, email: email, password: password, password2: password2)
        if (!request.post) {
//            return [registerCommand: new RegisterCommand()]
            render (registerCommand as JSON)
            return
        }

        if (registerCommand.hasErrors()) {
//            return [registerCommand: registerCommand]
            render (registerCommand as JSON)
            return
        }

        def user = uiRegistrationCodeStrategy.createUser(registerCommand)
        String salt = saltSource instanceof NullSaltSource ? null : registerCommand.username
        RegistrationCode registrationCode = uiRegistrationCodeStrategy.register(user, registerCommand.password, salt)

        if (registrationCode == null || registrationCode.hasErrors()) {
            // null means problem creating the user
            def msg = "Unable to register user " + registerCommand.username
            render (status: HttpStatus.BAD_REQUEST, text: msg)
            return
        }

        sendVerifyRegistrationMail registrationCode, user, registerCommand.email

        def result = [emailSent: true, registerCommand: registerCommand]
        render (result as JSON)
    }

    protected void sendVerifyRegistrationMail(RegistrationCode registrationCode, user, String email) {
        String url = generateLink('verifyRegistration', [t: registrationCode.token])
        println url

//        def body = registerEmailBody
//        if (body.contains('$')) {
//            body = evaluate(body, [user: user, url: url])
//        }
//
//        uiMailStrategy.sendVerifyRegistrationMail(
//                to: email,
//                from: registerEmailFrom,
//                subject: registerEmailSubject,
//                html: body.toString())
    }

    protected String generateLink(String action, linkParams) {
        String base = "$request.scheme://$request.serverName:$request.serverPort$request.contextPath";
        String url = base + "/api/register/verify?t=" + linkParams['t']
//        createLink(base: "$request.scheme://$request.serverName:$request.serverPort$request.contextPath",
//                controller: 'restRegister', action: action, params: linkParams)
        return url
    }

    def verifyRegistration() {

        String token = params.t

        RegistrationCode registrationCode = token ? RegistrationCode.findByToken(token) : null
        if (!registrationCode) {
            def msg = "Bad verification code"
            render (status: HttpStatus.BAD_REQUEST, text: msg)
            return
        }

        def user = uiRegistrationCodeStrategy.finishRegistration(registrationCode)

        if (!user) {
            def msg = "Bad verification code"
            render (status: HttpStatus.BAD_REQUEST, text: msg)
            return
        }

        if (user.hasErrors()) {
            // expected to be handled already by ErrorsStrategy.handleValidationErrors
            return
        }

        //flash.message = message(code: 'spring.security.ui.register.complete')
        //redirect uri: registerPostRegisterUrl ?: successHandlerDefaultTargetUrl

        // redirect to this URL which will redirect to player profile after login
        // https://gateway-pc:4200/login/signin
        String url = "$request.scheme://$request.serverName" + ":4200/login/signin"
        url += '?returnUrl=/playerprofile/list'
//        url += URLEncoder.encode("?firstName=Mario&lastName=Lorenc&email=swaveklorenc@gmail.com", "UTF-8")
        println 'verification url' + url

        redirect(url: url)
    }
}