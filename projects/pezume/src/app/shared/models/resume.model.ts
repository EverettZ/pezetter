import { InputTypes } from './input-types';
import { FormControl, FormGroup } from '@angular/forms';
import { Visiblity } from '../constants/visibility';

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
    order?: number;
}

export interface ResumePreview extends ResumeBase {
    about: string;
    photoURL: string;
    bannerUrl?: string;
    userId: string;
    created: number;
    id: string;
    visibility: Visiblity;
}

export interface ResumePage extends ResumeBase {
    cards: ResumeCard[];
    id: string;
}

export interface ResumeCard extends ResumeBase, ResumeDateRange {
    items: GenType<Item<string | number>>;
}


export interface Item<T> extends ItemValue<T> {
}

export interface Resume extends ResumePreview {
    email?: string;
    phone?: string;
    pages: ResumePage[];
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
    photoURL: FormControl;
    bannerUrl: FormControl;
    pages: FormGroup;
}

export default Resume;

