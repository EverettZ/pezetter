import { InputTypes } from './input-types';

export interface GenType<V> {
    [key: string]: V;
}
export interface ResumeDateRange {
    startDate?: Date;
    endDate?: Date;
}

export interface ControlValue<T> {
    type: InputTypes;
    value: T;
}

export interface ResumeBase {
    title: string;
    subtitle: string;
    order?: number;
}

export interface ResumePage extends ResumeBase {
    groups: GenType<ResumePart>;
}

export interface ResumePart extends ResumeBase, ResumeDateRange {
    controls: GenType<Control<string | number>>;
}


export interface Control<T> extends ControlValue<T> {
}

export interface Resume extends ResumeBase {
    id: string;
    email: string;
    phone: string;
    about: string;
    avatarUrl: string;
    bannerUrl?: string;
    pages: GenType<ResumePage>;
}

export default Resume;

