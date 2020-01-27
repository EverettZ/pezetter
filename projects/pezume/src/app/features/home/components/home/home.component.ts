import { Component, OnInit } from '@angular/core';
import { ResumeService, defaultQuery } from '../../../../shared/services/resume/resume.service';
import Resume from '../../../../shared/models/resume.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ResumePreview } from '../../../../shared/models/resume.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  searchTerms: SearchTerm[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  isSmall$: Observable<boolean>;
  pageSizeOptions$: Observable<number[]>;
  get search() {
    return this.searchForm.get("search");
  }
  constructor(public resumeService: ResumeService, private breakpoint: BreakpointObserver) {

    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.minLength(1), Validators.maxLength(100)])
    });

    this.resumeService.initResumePreviews();

    this.isSmall$ = this.breakpoint.observe([
      Breakpoints.Small
    ]).pipe(
      map((result) => {
        return result.matches;
      }),
      share()
    );

    this.pageSizeOptions$ = this.isSmall$.pipe(
      map((isSmall) => {

        if (isSmall) {
          this.resumeService.paginate(0, smallPageSizeOption[0]);
          return smallPageSizeOption;
        }

        this.resumeService.paginate(0, defaultPageSizeOption[0]);
        return defaultPageSizeOption;

      }),
      share()
    );
  }

  ngOnInit() {
    this.resumeService.selected$ = null;
  }

  onSubmit() {
    if (this.search.value.length) {
      this.resumeService.search(this.search.value);
    } else {
      this.resumeService.initResumePreviews();
    }
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
  pageEvent(ev: PageEvent) {
    console.log(ev);
  }
}

interface SearchTerm {
  name: string;
}

const smallPageSizeOption = [
  2, 10, 25
]

const defaultPageSizeOption = [
  10, 25, 50
]