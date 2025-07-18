import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetMovement } from './create-asset-movement';

describe('CreateAssetMovement', () => {
  let component: CreateAssetMovement;
  let fixture: ComponentFixture<CreateAssetMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssetMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssetMovement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
