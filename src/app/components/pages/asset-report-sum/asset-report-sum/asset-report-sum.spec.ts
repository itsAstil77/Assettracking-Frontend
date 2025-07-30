import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReportSum } from './asset-report-sum';

describe('AssetReportSum', () => {
  let component: AssetReportSum;
  let fixture: ComponentFixture<AssetReportSum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetReportSum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetReportSum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
