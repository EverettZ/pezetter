export interface IResumeCategoryItem {
    title: string;
    subTitle: string;
    start: Date;
    end: Date;
    link?: string;
    data: IResumeCategoryData[];
}

export interface IResumeCategoryData {
    value: string;
    type: ResumeCategoryItemDataType;
}

export interface  IResumePersonal {
    name: string;
    dob: Date;
    email: string;
    phone: string;
    avatar: string;
    position: string;
    description: string;
}

export enum ResumeCategoryItemDataType {
    Image = 'image',
    Text = 'text',
    Link = 'link',
    Location = 'location',
    Date = 'date'
}

export interface IResume {
    name: string;
    dob: Date;
    email: string;
    phone: string;
    avatar: string;
    position: string;
    description: string;
    items: IResumeCategory[];
}

export interface IResumeCategory {
    name: string;
    length: string;
    items: IResumeCategoryItem[];
}

export enum ResumeCategoryTypes {
    skills = 'skills',
    experience = 'experience',
    education = 'education',
    social = 'social',
    portfolio = 'portfolio',
    personal = 'personal'
}


