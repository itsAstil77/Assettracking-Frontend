import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCheckout } from './asset-checkout';

describe('AssetCheckout', () => {
  let component: AssetCheckout;
  let fixture: ComponentFixture<AssetCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
