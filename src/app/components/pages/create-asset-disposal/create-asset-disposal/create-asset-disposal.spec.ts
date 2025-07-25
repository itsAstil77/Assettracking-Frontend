import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetDisposal } from './create-asset-disposal';

describe('CreateAssetDisposal', () => {
  let component: CreateAssetDisposal;
  let fixture: ComponentFixture<CreateAssetDisposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssetDisposal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssetDisposal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
