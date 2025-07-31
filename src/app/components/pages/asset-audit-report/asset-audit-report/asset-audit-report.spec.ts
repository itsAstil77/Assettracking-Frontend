import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAuditReport } from './asset-audit-report';

describe('AssetAuditReport', () => {
  let component: AssetAuditReport;
  let fixture: ComponentFixture<AssetAuditReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetAuditReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAuditReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
