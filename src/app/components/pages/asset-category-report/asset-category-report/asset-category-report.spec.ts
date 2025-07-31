import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryReport } from './asset-category-report';

describe('AssetCategoryReport', () => {
  let component: AssetCategoryReport;
  let fixture: ComponentFixture<AssetCategoryReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCategoryReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
