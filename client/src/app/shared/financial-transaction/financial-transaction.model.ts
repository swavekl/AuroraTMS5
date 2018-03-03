
// type of transaction (payment i.g. charge)
export enum TransactionType {
    Charge = 'Charge',
    Refund = 'Refund'
}

export enum PaymentMethod {
    CreditCard = 'CreditCard',
    Check = 'Check',
    Cash = 'Cash',
    PayPal = 'PayPal'
}

export class FinancialTransaction {
      // date & time of transaction
      createdDate: Date

      // who entered this transaction
      createdBy: string

      // amount in cents e.g. $23.45 is 2345
      amount: number;

      // type of transaction (payment i.g. charge)
      type : TransactionType;

      paymentMethod: PaymentMethod;

      // some identifier for this transaction e.g. Stripe token representing credit card, check number
      paymentMethodIdentifier: string;

      // stripe public key used to generate the paymentMethodIdentifier, used to pull up the secret key
      accountIdentifier: string;

      // identifier for the charge made by Stripe in case in needs to be refunded
      stripeChargeIdentifier: string;

      // identifier for the refund of the given transaction (also stripeChargeIdentifier will contain the charge that was refunded), null for charge
      stripeRefundIdentifier: string;

      // if this transaction is a refund this the amount that was refunded (which could be less than amount for partial refunds), 0 for initial charge
      refundedAmount: number;

      // description which identifies this payment
      description: string;

      // tags identifying transaction
      tags: string [];

  /**
  */
  constructor (type: TransactionType, paymentMethod: PaymentMethod, token: string, accountIdentifier: string, amount: number, description: string, tags: string[], createdBy: string) {
    this.type = type;
    this.paymentMethod = paymentMethod;
    this.paymentMethodIdentifier = token;
    this.accountIdentifier = accountIdentifier;
    this.amount = amount;
    this.description = description;
    this.tags = tags;
    this.createdBy = createdBy;
    this.createdDate = new Date();
  }
}
