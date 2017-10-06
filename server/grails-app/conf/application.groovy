grails {
	plugin {
		springsecurity {
			rest {
				oauth {
					frontendCallbackUrl = { String tokenValue -> "http://localhost:4200/configuretournament#token=${tokenValue}" }
					facebook {
						client = org.pac4j.oauth.client.FacebookClient
						key = '${FB_APP_ID}'
						secret = '${FB_APP_SECRET}'
						scope = 'email,user_location'
						fields = 'id,name,first_name,middle_name,last_name,username'
						defaultRoles = ['ROLE_USER', 'ROLE_FACEBOOK']
					}
				}
			}
		}
	}
}

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'org.auroratms.User'
//grails.plugin.springsecurity.userLookup.usernamePropertyName = 'email'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'org.auroratms.UserRole'
grails.plugin.springsecurity.authority.className = 'org.auroratms.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']],
	[pattern: '/api/login/**', access: ['permitAll']],
	[pattern: '/api/register', access: ['permitAll']]
//	[pattern: '/todo/**', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/api/register', filters: 'none'],
//	[pattern: '/todo/**', filters: 'none'],
	//Stateless chain
	[
			pattern: '/api/**',
			filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
	],
	//Traditional chain
	[
			pattern: '/**',
			filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'
	]
]

