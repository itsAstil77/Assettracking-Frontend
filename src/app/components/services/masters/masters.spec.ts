import { TestBed } from '@angular/core/testing';

import { Masters } from './masters';

describe('Masters', () => {
  let service: Masters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Masters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
