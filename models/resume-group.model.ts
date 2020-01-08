import { IResumeCategory } from './resume-model';

export interface ResumeGrouping {
  personal: {
    name: string;
    avatar: string;
    dob: Date;
    email: string;
    phone: string;
    description: string;
    position: string;
  };
  experience: IResumeCategory;
  portfolio: IResumeCategory;
  education: IResumeCategory;
  skills: IResumeCategory;
  social: IResumeCategory;
}
