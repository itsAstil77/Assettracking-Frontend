import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCheckin } from './asset-checkin';

describe('AssetCheckin', () => {
  let component: AssetCheckin;
  let fixture: ComponentFixture<AssetCheckin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCheckin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCheckin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
