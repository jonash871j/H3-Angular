import { TestBed } from '@angular/core/testing';

import { TrumpTweetsService } from './trump-tweets.service';

describe('TrumpTweetsService', () => {
  let service: TrumpTweetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrumpTweetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
