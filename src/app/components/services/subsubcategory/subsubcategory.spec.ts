import { TestBed } from '@angular/core/testing';

import { Subsubcategory } from './subsubcategory';

describe('Subsubcategory', () => {
  let service: Subsubcategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Subsubcategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
