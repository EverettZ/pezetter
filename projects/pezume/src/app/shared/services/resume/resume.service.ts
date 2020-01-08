import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RESUME_MOCK } from './mock';
import Resume from '../../models/resume.model';
import { resumeToForms } from '../../utilities/resume-helpers';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  resumes: Resume[];
  selected: Resume;

  constructor() { }

  getResume(id: string) {
    return of(RESUME_MOCK);
  }

  getResumes() {
    return of([RESUME_MOCK]);
  }

  editResume(resume:Resume) {
    resumeToForms(resume);
  }

}
