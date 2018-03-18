import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as FinancialTransactionActions from './../financial-transaction/ngrx/financial-transaction.actions';
import { FinancialTransaction, TransactionType, PaymentMethod } from './../financial-transaction/financial-transaction.model';
import { Store } from '@ngrx/store';
import * as fromFinancialTransaction from './../financial-transaction/ngrx/financial-transaction.reducer';
import {Observable} from "rxjs/Observable";


import { NgForm } from '@angular/forms';

// karthikpks/angular2-stripe-card
declare var Stripe: any;

@Component({
  selector: 'credit-card-popup',
  templateUrl: './credit-card-popup.component.html',
  styleUrls: ['./credit-card-popup.component.css']
})
export class CreditCardPopupComponent implements OnInit, AfterViewInit, OnDestroy  {

  // native card element from stripe which will be mounted
  @ViewChild('cardInfo') cardInfo: ElementRef;

  // stripe card elements for card number, expiration date, CVC and zip code which will be embedded inside
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardZip: any;

  // event handler listening to the change events coming from card
  cardHandler = this.onChange.bind(this);
  brandingChangeHandler = this.onCreditCardNumberChange.bind(this);

  // stripe instance
  private stripe: any;

  // error coming from checking by card (on client ??)
  error: string;

  // amount to pay in cents
  amount: number;
  // description of transaction
  description: string;
  // additional tags that can be used to mark transaction
  tags: string [];

  // observables used to indicate progress, error state, success
  loading$: Observable<boolean>;
  error$: Observable<string>;
  success$: Observable<boolean>;

  // completed transaction
  financialTransaction$: Observable<FinancialTransaction>;
  // transaction to return (simply retrieved from above observable)
  financialTransactionToReturn: FinancialTransaction;

  // stripe public key to use for this transaction
  stripePublicKey: string;
  // flag indicating if Pay/Cancel should be disabled to prevent sending transaction twice
  disabledButtons:boolean;
  // flag for enabling close button when transaction is successfully completed
  disabledCloseButtons:boolean;

  // we either show error detected on the client by stripe (true) or from server (false)
  clientError:boolean;

  // credit card image recognized from number
  cardImageSrc:string = 'assets/images/unknown-cc.png';

  /**
  * Constructor
  */
  constructor(private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreditCardPopupComponent>,
    private store: Store<fromFinancialTransaction.State>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.amount = data.amount || 0;
    this.description = data.description || "";
    this.tags = data.tags || [];
    this.stripePublicKey = data.stripePublicKey;

    this.loading$ = store.select(fromFinancialTransaction.getLoading);
    this.error$ = store.select(fromFinancialTransaction.getError);
    this.success$ = store.select(fromFinancialTransaction.getSuccess);
    this.financialTransaction$ = store.select(fromFinancialTransaction.getFinancialTransaction);

    this.financialTransactionToReturn = null;
    this.financialTransaction$.subscribe(result => {
      if (result != null) {
        // keep the transaction unwrapped from observable
        this.financialTransactionToReturn = result;
      }
    });

    // listen to this observable to enable disable buttons
    this.success$.subscribe (result => {
      if (result === true) {
        // enable close button
        this.disabledButtons = true;
        this.disabledCloseButtons = false;
        this.cardImageSrc = 'assets/images/empty.png';
        // remove credit card components so they can't enter another card
        this.ngOnDestroy();
      }
    });

    // enable pay/cancel buttons if there is error so user can fix them and try again or cancel
    this.error$.subscribe (result => {
         this.disabledButtons = false;
    });

    // start with pay/cancel enabled and close disabled
    this.disabledButtons = false;
    this.disabledCloseButtons = true;

    // start with showing errors on client since they may occur first - liek bad card number, wrong expiration date etc.
    this.clientError = true;
  }

  ngAfterViewInit() {
   if (typeof window !== 'undefined') {
        this.onInitStripe();
      }
  }

  onInitStripe () {
      this.stripe = Stripe(this.stripePublicKey);
      const elements = this.stripe.elements();

     var elementStyles = {
        base: {
          fontSize: '18px',
          fontSmoothing: 'antialiased',

          ':focus': {
            color: 'blue'
          },

          '::placeholder': {
            color: 'gray',
          },

          ':focus::placeholder': {
            color: 'gray',
          },
        },
        invalid: {
          color: 'red',
          ':focus': {
            color: 'red',
          },
          '::placeholder': {
            color: 'red',
          },
        },
      };

      var elementClasses = {
        focus: 'focus',
        empty: 'empty',
        invalid: 'invalid',
      };

     var options = {
         style: elementStyles,
         classes: elementClasses,
     };

      this.cardNumber = elements.create('cardNumber', options);
      this.cardNumber.mount('#card-number');

      this.cardExpiry = elements.create('cardExpiry', options);
      this.cardExpiry.mount('#card-expiry');

      this.cardCvc = elements.create('cardCvc', options);
      this.cardCvc.mount('#card-cvc');

      this.cardZip = elements.create('postalCode', options);
      this.cardZip.mount('#postal-code');

      this.cardNumber.addEventListener('change', this.cardHandler);
      this.cardExpiry.addEventListener('change', this.cardHandler);
      this.cardCvc.addEventListener('change', this.cardHandler);
      this.cardZip.addEventListener('change', this.cardHandler);

      this.cardNumber.addEventListener('change', this.brandingChangeHandler);
  }

  ngOnDestroy() {
    if (this.cardNumber != null) {
      this.cardNumber.removeEventListener('change', this.cardHandler);
      this.cardNumber.removeEventListener('change', this.brandingChangeHandler);
      this.cardNumber.destroy();
      this.cardNumber = null;
      }
    if (this.cardExpiry != null) {
      this.cardExpiry.removeEventListener('change', this.cardHandler);
      this.cardExpiry.destroy();
      this.cardExpiry = null;
      }
    if (this.cardCvc != null) {
      this.cardCvc.removeEventListener('change', this.cardHandler);
      this.cardCvc.destroy();
      this.cardCvc = null;
      }
    if (this.cardZip != null) {
      this.cardZip.removeEventListener('change', this.cardHandler);
      this.cardZip.destroy();
      this.cardZip = null;
      }
  }

  ngOnInit() {
      // reset the state of this transaction, user may have canceled and came back again
      this.store.dispatch(new FinancialTransactionActions.FinancialTransactionResetAction({}));
  }

  /**
  * Stripe checks while user is typing so we can show error even before user has a chance to submit to click Pay
  */
  onChange({ error }) {
    this.clientError = true;

    if (error) {
      this.error = error.message;
      this.disabledCloseButtons = true;
    } else {
      this.error = null;
      this.disabledButtons = false;
    }

    this.cd.detectChanges();
  }

  /**
  * for setting credit card icon
  */
  onCreditCardNumberChange ( event ) {
//    console.log ('in branding handler', event);

    // Switch brand logo
    if (event.brand) {
      var brand = event.brand;
      var cardBrandToPfClass = {
        'visa': 'visa',
        'mastercard': 'mastercard',
        'amex': 'amex',
        'discover': 'discover',
        'diners': 'diners',
        'jcb': 'jcb',
        'unknown': 'unknown-cc'
      };

      var iconFile = 'unknown-cc';
      if (brand in cardBrandToPfClass) {
        iconFile = cardBrandToPfClass[brand];
      }
      this.cardImageSrc = 'assets/images/' + iconFile + '.png';
    }
  }


  /**
  * submit handler
  */
  async onSubmit(form: NgForm) {

    // disable buttons so they can't click them
    this.disabledButtons = true;
    this.disabledCloseButtons = true;
    this.error = null;

    const { token, error } = await this.stripe.createToken(this.cardNumber);

    if (error) {
      this.store.dispatch(new FinancialTransactionActions.FinancialTransactionFailureAction(error.message));
      // enable buttons again
      this.disabledButtons = false;
    } else {
      var payment: FinancialTransaction = new FinancialTransaction(
      TransactionType.Charge, PaymentMethod.CreditCard,
      token.id, this.stripePublicKey, this.amount, this.description, this.tags, 'swavek');

      // client checking passed, now server checking may fail
      this.clientError = false;

      this.store.dispatch(new FinancialTransactionActions.FinancialTransactionAction(payment));
      // we will close dialog when success arrives
    }
  }

  onCancel() {
    this.store.dispatch(new FinancialTransactionActions.FinancialTransactionResetAction({}));
    this.dialogRef.close({action: 'Cancel', transaction: null});
  }

  onClose(): void {
    this.store.dispatch(new FinancialTransactionActions.FinancialTransactionResetAction({}));
    this.dialogRef.close({action: 'Close', transaction: this.financialTransactionToReturn});
  }

}
