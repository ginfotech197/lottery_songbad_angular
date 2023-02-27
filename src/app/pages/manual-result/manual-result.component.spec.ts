import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualResultComponent } from './manual-result.component';

describe('ManualResultComponent', () => {
  let component: ManualResultComponent;
  let fixture: ComponentFixture<ManualResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
