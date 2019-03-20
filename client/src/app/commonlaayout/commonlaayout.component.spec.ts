import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonlaayoutComponent } from './commonlaayout.component';

describe('CommonlaayoutComponent', () => {
  let component: CommonlaayoutComponent;
  let fixture: ComponentFixture<CommonlaayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonlaayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonlaayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
