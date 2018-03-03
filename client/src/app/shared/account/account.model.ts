
// type of transaction (payment i.g. charge)
export enum GatewayType {
    Stripe = 'Stripe',
    PayPal = 'PayPal'
}

export class Account {
    gatewayType: GatewayType;

    // one system account
    system: boolean;

    // public key to use when generating secure tokens for protecting credit cards
    stripePublicKey: string

    // secret key used when submitting charges/refund from the server - identifies the Stripe account
    stripeSecretKey: string

  /**
  */
  constructor () {
  }
}
