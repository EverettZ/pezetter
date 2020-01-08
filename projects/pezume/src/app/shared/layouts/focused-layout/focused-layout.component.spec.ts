import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedLayoutComponent } from './focused-layout.component';

describe('FocusedLayoutComponent', () => {
  let component: FocusedLayoutComponent;
  let fixture: ComponentFixture<FocusedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
