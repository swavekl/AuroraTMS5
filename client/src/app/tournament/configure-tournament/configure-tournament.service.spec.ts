import { TestBed, inject } from '@angular/core/testing';

import { ConfigureTournamentService } from './configure-tournament.service';

describe('ConfigureTournamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigureTournamentService]
    });
  });

  it('should be created', inject([ConfigureTournamentService], (service: ConfigureTournamentService) => {
    expect(service).toBeTruthy();
  }));
});
