import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovement } from './asset-movement';

describe('AssetMovement', () => {
  let component: AssetMovement;
  let fixture: ComponentFixture<AssetMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetMovement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
