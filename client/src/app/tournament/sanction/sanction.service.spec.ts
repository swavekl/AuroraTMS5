import { TestBed, inject } from '@angular/core/testing';

import { SanctionService } from './sanction.service';

describe('SanctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanctionService]
    });
  });

  it('should be created', inject([SanctionService], (service: SanctionService) => {
    expect(service).toBeTruthy();
  }));
});
