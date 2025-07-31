import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCatalogueReport } from './asset-catalogue-report';

describe('AssetCatalogueReport', () => {
  let component: AssetCatalogueReport;
  let fixture: ComponentFixture<AssetCatalogueReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCatalogueReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCatalogueReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
