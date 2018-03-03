package org.auroratms

import com.stripe.Stripe
import com.stripe.exception.CardException
import com.stripe.model.Charge
import grails.transaction.Transactional
import org.springframework.beans.factory.annotation.Value

@Transactional
class FinancialTransactionService {

//    @Value('${usatt.stripe.secret.key}')
//    String usattStripeSecretKey

    def charge(FinancialTransaction payment, Account account) {

        try {
            // make a payment

            // Charge the user's card:
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("amount", payment.amount);
            params.put("currency", "usd");
            params.put("description", payment.description);
            params.put("source", payment.paymentMethodIdentifier);
            // todo : tags to
//        Map<String, String> initialMetadata = new HashMap<String, String>();
//        for (String tag : payment.tags) {
//            initialMetadata.put("order_id", "6735");
//        }
//        chargeParams.put("metadata", initialMetadata);

            // make the charge
            Stripe.apiKey = account.stripeSecretKey;
            Charge charge = Charge.create(params);
            // fill response
            payment.stripeChargeIdentifier = charge.id
            payment.createdDate = new Date();
            return null
        } catch (CardException e) {
            // Since it's a decline, CardException will be caught
            //		System.out.println("Status is: " + e.getCode());
            //		System.out.println("Message is: " + e.getMessage());
//            def errors = ['errors', e.getCode(), e.getDeclineCode(), e.getMessage()]
            def errors = [e.getMessage()]
//            respond errors, [status: NOT_ACCEPTABLE]
			return errors
            //	  } catch (RateLimitException e) {
            //		// Too many requests made to the API too quickly
            //	  } catch (InvalidRequestException e) {
            //		// Invalid parameters were supplied to Stripe's API
            //	  } catch (AuthenticationException e) {
            //		// Authentication with Stripe's API failed
            //		// (maybe you changed API keys recently)
            //	  } catch (APIConnectionException e) {
            //		// Network communication with Stripe failed
            //	  } catch (StripeException e) {
            //		// Display a very generic error to the user, and maybe send
            //		// yourself an email
        } catch (Exception e) {
            // Something else happened, completely unrelated to Stripe
            println "e " + e.getMessage();
            def errors = ['errors', e.getMessage()]
//            respond errors, [status: NOT_ACCEPTABLE]
			return errors
        }
    }

    def refund(FinancialTransaction refund) {
        // TODO refunds
    }
}
