import { TestBed } from '@angular/core/testing';

import { SimpleFeatureService } from './simple-feature.service';

describe('SimpleFeatureService', () => {
  let service: SimpleFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
