import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderQuestionComponent } from './resume-builder-question.component';

describe('ResumeBuilderQuestionComponent', () => {
  let component: ResumeBuilderQuestionComponent;
  let fixture: ComponentFixture<ResumeBuilderQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeBuilderQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
