import { TestBed } from '@angular/core/testing';

import { VideoSearchControlsService } from './video-search-controls.service';

describe('VideoSearchControlsService', () => {
  let service: VideoSearchControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSearchControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
