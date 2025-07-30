import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovementReportSum } from './asset-movement-report-sum';

describe('AssetMovementReportSum', () => {
  let component: AssetMovementReportSum;
  let fixture: ComponentFixture<AssetMovementReportSum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetMovementReportSum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetMovementReportSum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
