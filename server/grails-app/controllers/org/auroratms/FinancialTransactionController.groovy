package org.auroratms

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE

@Secured(['ROLE_USER'])
@Transactional(readOnly = true)
class FinancialTransactionController extends RestfulController {
    static responseFormats = ['json', 'xml']

    def FinancialTransactionService financialTransactionService

    FinancialTransactionController() {
        super(FinancialTransaction)
    }

    @Transactional
    def save() {
        if(handleReadOnly()) {
            return
        }
        def instance = createResource()

        instance.validate()
        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view:'create' // STATUS CODE 422
            return
        }

        def errors = null
        FinancialTransaction financialTransaction = instance as FinancialTransaction
        if (financialTransaction.type == FinancialTransaction.TransactionType.Charge) {
            if (financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.CreditCard) {
                // make a financialTransaction via stripe service
                def account = Account.findByStripePublicKey(financialTransaction.accountIdentifier)
                errors = financialTransactionService.charge(financialTransaction, account)
            } else if (financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.Check ||
                       financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.Cash) {
                // simply record these payments
            }
        } else if (financialTransaction.type == FinancialTransaction.TransactionType.Refund) {
            if (financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.CreditCard) {
                // make a financialTransaction via stripe service
                errors = financialTransactionService.refund(financialTransaction)
            } else if (financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.Check ||
                    financialTransaction.paymentMethod == FinancialTransaction.PaymentMethod.Cash) {
                // simply record these payments
            }
        }

        if (errors != null) {
            respond errors, [status: NOT_ACCEPTABLE]
        } else {
            // persist financialTransaction information in our database
            saveResource instance

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
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        int count = countResources()
        List<FinancialTransaction> results = listAllResources(params)
        def responseMap = ['count': count, 'results': results]
        respond responseMap
    }
}
