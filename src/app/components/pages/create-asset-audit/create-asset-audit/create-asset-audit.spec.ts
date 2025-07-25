import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetAudit } from './create-asset-audit';

describe('CreateAssetAudit', () => {
  let component: CreateAssetAudit;
  let fixture: ComponentFixture<CreateAssetAudit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssetAudit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssetAudit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
