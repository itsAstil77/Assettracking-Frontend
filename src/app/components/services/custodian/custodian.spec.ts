import { TestBed } from '@angular/core/testing';

import { Custodian } from './custodian';

describe('Custodian', () => {
  let service: Custodian;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Custodian);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
