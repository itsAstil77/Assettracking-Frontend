import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDofReport } from './asset-dof-report';

describe('AssetDofReport', () => {
  let component: AssetDofReport;
  let fixture: ComponentFixture<AssetDofReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDofReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDofReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
