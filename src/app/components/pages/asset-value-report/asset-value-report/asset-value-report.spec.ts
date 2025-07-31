import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetValueReport } from './asset-value-report';

describe('AssetValueReport', () => {
  let component: AssetValueReport;
  let fixture: ComponentFixture<AssetValueReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetValueReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetValueReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
