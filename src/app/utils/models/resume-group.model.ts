import { IResumeCategory, IResumePersonal } from './resume-model';

export interface ResumeGrouping {
  personal: IResumePersonal;
  experience: IResumeCategory;
  portfolio: IResumeCategory;
  education: IResumeCategory;
  skills: IResumeCategory;
  social: IResumeCategory;
}
