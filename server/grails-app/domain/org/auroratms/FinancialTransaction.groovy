package org.auroratms

class FinancialTransaction {

    // date & time of transaction
    Date createdDate

    // who entered this transaction
    String createdBy

    // amount in cents e.g. $23.45 is 2345
    long amount;

    // type of transaction (payment i.g. charge)
    enum TransactionType {
        Charge, Refund
    }

    TransactionType type

    enum PaymentMethod {
        CreditCard, Check, Cash, PayPal
    }
    PaymentMethod paymentMethod

    // some identifier for this transaction e.g. Stripe token representing credit card, check number
    String paymentMethodIdentifier

    // stripe public key used to generate the paymentMethodIdentifier, used to pull up the secret key
    String accountIdentifier

    // identifier for the charge made by Stripe in case in needs to be refunded
    String stripeChargeIdentifier

    // identifier for the refund of the given transaction (also stripeChargeIdentifier will contain the charge that was refunded), null for charge
    String stripeRefundIdentifier

    // if this transaction is a refund this the amount that was refunded (which could be less than amount for partial refunds), 0 for initial charge
    long refundedAmount

    // description which identifies this payment
    String description

    // tags identifying transaction
    String tags

    static constraints = {
        stripeChargeIdentifier blank: true, nullable: true
        stripeRefundIdentifier blank: true, nullable: true
    }
}
