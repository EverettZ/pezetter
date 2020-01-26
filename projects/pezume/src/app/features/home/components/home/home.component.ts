import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import Resume from '../../../../shared/models/resume.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ResumePreview } from '../../../../shared/models/resume.model';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resumes$: Observable<ResumePreview[]>;
  searchForm: FormGroup;
  searchTerms: SearchTerm[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  get search() {
    return this.searchForm.get("search");
  }
  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumes$ = this.resumeService.getResumePreviews();
    this.resumeService.selected = null;
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
  }

  onSubmit() {
    console.log("SUBMIT")
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our term
    if ((value || '').trim()) {
      this.searchTerms.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(term: SearchTerm): void {
    const index = this.searchTerms.findIndex((t) => t.name === term.name);

    if (index >= 0) {
      this.searchTerms.splice(index, 1);
    }
  }

}

interface SearchTerm {
  name: string;
}