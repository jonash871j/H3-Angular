import { TestBed } from '@angular/core/testing';

import { DictatorTweetAPIService } from './dictator-tweet-api.service';

describe('DictatorTweetAPIService', () => {
  let service: DictatorTweetAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictatorTweetAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
