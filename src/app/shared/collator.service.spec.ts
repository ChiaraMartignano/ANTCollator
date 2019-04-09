import { TestBed } from '@angular/core/testing';

import { CollatorService } from './collator.service';

describe('CollatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollatorService = TestBed.get(CollatorService);
    expect(service).toBeTruthy();
  });
});
