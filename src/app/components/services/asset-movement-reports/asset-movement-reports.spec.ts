import { TestBed } from '@angular/core/testing';

import { AssetMovementReports } from './asset-movement-reports';

describe('AssetMovementReports', () => {
  let service: AssetMovementReports;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetMovementReports);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
