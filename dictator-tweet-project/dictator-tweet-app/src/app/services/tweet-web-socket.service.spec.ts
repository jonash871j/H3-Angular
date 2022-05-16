import { TestBed } from '@angular/core/testing';

import { TweetWebSocketService } from './tweet-web-socket.service';

describe('TweetWebSocketService', () => {
  let service: TweetWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
