import { TestBed, inject } from '@angular/core/testing';

import { FinancialTransactionService } from './financial-transaction.service';

describe('FinancialTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinancialTransactionService]
    });
  });

  it('should be created', inject([FinancialTransactionService], (service: FinancialTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
