import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovementRequest } from './asset-movement-request';

describe('AssetMovementRequest', () => {
  let component: AssetMovementRequest;
  let fixture: ComponentFixture<AssetMovementRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetMovementRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetMovementRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
