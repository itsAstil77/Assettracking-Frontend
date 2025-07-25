import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDisposalRequest } from './asset-disposal-request';

describe('AssetDisposalRequest', () => {
  let component: AssetDisposalRequest;
  let fixture: ComponentFixture<AssetDisposalRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDisposalRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDisposalRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
