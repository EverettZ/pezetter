import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePageCardComponent } from './resume-page-card.component';

describe('ResumePageCardComponent', () => {
  let component: ResumePageCardComponent;
  let fixture: ComponentFixture<ResumePageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumePageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumePageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
