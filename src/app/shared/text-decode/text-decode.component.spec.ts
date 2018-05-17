import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDecodeComponent } from './text-decode.component';

describe('TextDecodeComponent', () => {
  let component: TextDecodeComponent;
  let fixture: ComponentFixture<TextDecodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDecodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
