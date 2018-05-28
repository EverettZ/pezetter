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
    href: string;
    items: IResumeItem[];
}

export interface IResumeItem {
    name: string;
    length: number;
    href: string;
}

export interface IResumeCategory {
    path: string;
    length: string;
    items: ICardModel[];
}