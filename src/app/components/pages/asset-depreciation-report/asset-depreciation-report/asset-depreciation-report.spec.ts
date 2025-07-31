import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDepreciationReport } from './asset-depreciation-report';

describe('AssetDepreciationReport', () => {
  let component: AssetDepreciationReport;
  let fixture: ComponentFixture<AssetDepreciationReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDepreciationReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDepreciationReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
