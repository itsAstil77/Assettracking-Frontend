import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovementReport } from './asset-movement-report';

describe('AssetMovementReport', () => {
  let component: AssetMovementReport;
  let fixture: ComponentFixture<AssetMovementReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetMovementReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetMovementReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
