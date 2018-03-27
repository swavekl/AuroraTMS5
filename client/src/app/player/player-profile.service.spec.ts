import { TestBed, inject } from '@angular/core/testing';

import { PlayerProfileService } from './player-profile.service';

describe('PlayerProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerProfileService]
    });
  });

  it('should be created', inject([PlayerProfileService], (service: PlayerProfileService) => {
    expect(service).toBeTruthy();
  }));
});
