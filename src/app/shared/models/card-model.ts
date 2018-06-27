export interface ICardModel {
    title: string;
    subTitle: string;
    start: Date;
    end: Date;
    data: ICardData[];
}

export interface ICardData {
    value: string;
    type: CardDataType;
}

export enum CardDataType {
    Image = "image",
    Text = "text",
    Link = "link",
    Location = "location",
    Date = "date"
}

export interface IResume {
    name: string;
    dob: Date;
    email: string;
    phone: string;
    items: IResumeItem[];
}

export interface IResumeItem {
    name: string;
    length: number;
    href: string;
}

export interface IResumeCategory {
    name: string;
    length: string;
    items: ICardModel[];
}

export interface IBaseSnippet {
    personalInfoHref: string;
    resumeHrefs: string[];
}