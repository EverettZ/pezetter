import { IResumeCategory, IResumePersonal } from './resume-model';

export interface ResumeResolverData {
  category?: IResumeCategory;
  personal: IResumePersonal;
}
