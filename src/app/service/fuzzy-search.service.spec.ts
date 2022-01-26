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

  it('matches with some query', () => {
    let video = { snippet: { title: 'Gabriel "Cocó" Orozco | Comuna Charla', description: "" } }
    let matches = service.matchesVideo("comuna charla", video as Video);
    expect(matches).toBeTrue();
  });

  it('does not match with some query', () => {
    let video = { snippet: { title: "Charla Gabriel Eduardo Ojeda Fosaro", description: "A description" } }
    let matches = service.matchesVideo("comuna charla", video as Video);
    expect(matches).toBeFalse();
  });
});
