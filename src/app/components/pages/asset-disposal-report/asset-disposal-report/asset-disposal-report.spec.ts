import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDisposalReport } from './asset-disposal-report';

describe('AssetDisposalReport', () => {
  let component: AssetDisposalReport;
  let fixture: ComponentFixture<AssetDisposalReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDisposalReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDisposalReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
