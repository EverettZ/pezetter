import { InputTypes } from './input-types';
import { FormControl, FormGroup } from '@angular/forms';

export interface GenType<V> {
    [key: string]: V;
}
export interface ResumeDateRange {
    startDate?: number;
    endDate?: number;
}

export interface ItemValue<T> {
    type: InputTypes;
    value: T;
}

export interface ResumeBase {
    title: string;
    subtitle: string;
    order: number;
}

export interface ResumePage extends ResumeBase {
    cards: GenType<ResumeCard>;
}

export interface ResumeCard extends ResumeBase, ResumeDateRange {
    items: GenType<Item<string | number>>;
}


export interface Item<T> extends ItemValue<T> {
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
export interface ResumeFormGroupBase {
    title: FormControl;
    subtitle: FormControl;
    order: FormControl;
}

export interface ResumeForm extends ResumeFormGroupBase {
    email: FormControl;
    phone: FormControl;
    about: FormControl;
    avatarUrl: FormControl;
    bannerUrl: FormControl;
    pages: FormGroup;
}

export default Resume;

