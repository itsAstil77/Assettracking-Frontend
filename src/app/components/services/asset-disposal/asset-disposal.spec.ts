import { TestBed } from '@angular/core/testing';

import { AssetDisposal } from './asset-disposal';

describe('AssetDisposal', () => {
  let service: AssetDisposal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDisposal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
