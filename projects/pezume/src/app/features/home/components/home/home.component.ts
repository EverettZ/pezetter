import { SearchTerm } from './../../../../shared/models/search-term.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';;
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share, distinctUntilChanged, debounceTime, startWith } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  filterByOptions = [
    {
      value: 'title',
      viewValue: 'Name'
    },
    {
      value: 'subtitle',
      viewValue: 'Profession'
    },
    {
      value: 'about',
      viewValue: 'About'
    }
  ]
  searchForm: FormGroup;
  filter$: Observable<SearchTerm>;
  isSmall$: Observable<boolean>;
  pageSizeOptions$: Observable<number[]>;

  get search() {
    return this.searchForm.get("search");
  }
  get filterBy() {
    return this.searchForm.get("filterBy");
  }
  get sortDescending() {
    return this.searchForm.get("sortDescending");
  }

  constructor(public resumeService: ResumeService, private breakpoint: BreakpointObserver) {
    let searchNum = 0;
    console.log("HERE WE GO")
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.minLength(1), Validators.maxLength(100)]),
      filterBy: new FormControl(this.filterByOptions[0].value, [Validators.required]),
      sortDescending: new FormControl(false, [Validators.required])
    }, { updateOn: 'change' });

    this.resumeService.initResumePreviews();

    this.searchForm.valueChanges.pipe(
      startWith(this.searchForm.value),
      debounceTime(500),
      distinctUntilChanged((prev, curr) => {
        return (prev.filterBy === curr.filterBy && prev.search === curr.search && prev.sortDescending === curr.sortDescending);
      }),
      untilDestroyed(this)
    ).subscribe((result: SearchTerm) => {
      this.resumeService.search(result, searchNum === 0)
      searchNum++;
    });


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

  ngOnDestroy(): void {
  }

}

const smallPageSizeOption = [
  2, 10, 25
]

const defaultPageSizeOption = [
  10, 25, 50
]
