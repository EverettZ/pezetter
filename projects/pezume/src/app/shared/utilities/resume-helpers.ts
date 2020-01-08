import Resume from '../models/resume.model';
import { FormControl, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
export function resumeToForms(resume: Resume) {
    const group = {
        title: new FormControl(resume.title, [Validators.required]),
        subtitle: new FormControl(resume.subtitle, [Validators.required]),
        email: new FormControl(resume.email, [Validators.required, Validators.email]),
        phone: new FormControl(resume.phone, [Validators.required]),
        about: new FormControl(resume.about, [Validators.required, Validators.maxLength(500)])
    };

    const pages = {};
    Object.keys(resume.pages).forEach((pageKey) => {
        const currPage = resume.pages[pageKey];
        const pageForm = {
            title: new FormControl(currPage.title, [Validators.required]),
            subtitle: new FormControl(currPage.subtitle)
        };
        const pageGroups = {}
        Object.keys(currPage.cards).forEach((pageGroupKey) => {
            const currPageGroup = currPage.cards[pageGroupKey];
            const pageGroupForm = {
                title: new FormControl(currPageGroup.title, [Validators.required]),
                subtitle: new FormControl(currPageGroup.subtitle),
            };
            const controls = {}
            Object.keys(currPageGroup.items).forEach((pageGroupControlKey) => {
                const currPageGroupControl = currPageGroup.items[pageGroupControlKey];
                controls[pageGroupControlKey] = new FormControl(currPageGroupControl.value)
            })
            pageGroupForm['items'] = new FormGroup(controls);
            pageGroups[pageGroupKey] = new FormGroup(pageGroupForm);
        });
        pageForm['cards'] = new FormGroup(pageGroups);
        pages[pageKey] = new FormGroup(pageForm);
    });
    group['pages'] = new FormGroup(pages);
    const fGroup = new FormGroup(group);
    console.log(fGroup.value);
    return fGroup;
}

export function formsToResume() {

}