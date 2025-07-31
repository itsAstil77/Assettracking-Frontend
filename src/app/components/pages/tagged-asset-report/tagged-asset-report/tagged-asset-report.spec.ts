import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedAssetReport } from './tagged-asset-report';

describe('TaggedAssetReport', () => {
  let component: TaggedAssetReport;
  let fixture: ComponentFixture<TaggedAssetReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggedAssetReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedAssetReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
