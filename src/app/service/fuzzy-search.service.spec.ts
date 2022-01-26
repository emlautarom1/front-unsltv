import { TestBed } from '@angular/core/testing';
import { Video } from '../model/video';

import { FuzzySearchService } from './fuzzy-search.service';

describe('FuzzySearchService', () => {
  let service: FuzzySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuzzySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('matches on a video title', () => {
    let video = { snippet: { title: "This is a test video", description: "" } }
    let matches = service.matchesVideo("test", video as Video);
    expect(matches).toBeTrue();
  });

  it('matches on a video description', () => {
    let video = { snippet: { title: "", description: "This is a test description" } }
    let matches = service.matchesVideo("test", video as Video);
    expect(matches).toBeTrue();
  });

  it('does not match with some query', () => {
    let video = { snippet: { title: "A title", description: "A description" } }
    let matches = service.matchesVideo("egypt", video as Video);
    expect(matches).toBeFalse();
  });
});
