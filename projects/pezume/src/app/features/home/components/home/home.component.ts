import { defaultQuery } from './../../../../shared/constants/default-resumes-query';
import { SearchTerm } from './../../../../shared/models/search-term.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';;
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share, distinctUntilChanged, debounceTime, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'pez-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  smallPageSizeOption = [
    2, 10, 25
  ]

  defaultPageSizeOption = [
    10, 25, 50
  ]

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
  // paginateChange$: Subject<PageEvent> = new Subject();
  searchCount = 0;

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
      })
    ).subscribe((result: SearchTerm) => {
      console.log('SEARCH!')
      this.resumeService.query.start = defaultQuery.start;
      this.resumeService.search(result, this.resumeService.query.start, this.resumeService.query.limit);
    });


    this.isSmall$ = this.breakpoint.observe([
      Breakpoints.Small
    ]).pipe(
      map((result) => {
        return result.matches;
      }),
      share()
    );

    // this.pageSizeOptions$ = this.isSmall$.pipe(
    //   map((isSmall) => {

    //     console.log('PAGE SIZE OPTIONS SEARCH')

    //     if (isSmall) {
    //       this.resumeService.query.start = defaultQuery.start;
    //       this.resumeService.search(this.searchForm.value, this.resumeService.query.start, this.resumeService.query.limit);
    //       return smallPageSizeOption;
    //     }

    //     this.resumeService.query.start = defaultQuery.start;
    //     this.resumeService.search(this.searchForm.value, this.resumeService.query.start, this.resumeService.query.limit);
    //     return defaultPageSizeOption;

    //   }),
    //   share()
    // );
  }

  ngOnInit() {
    this.resumeService.selected$ = null;
  }

  ngOnDestroy(): void {
  }

  paginateChange(ev: PageEvent) {
    console.log('HOME >> PAGINATECHANGE')
    this.resumeService.query.start = defaultQuery.start;
    this.resumeService.search(this.searchForm.value, ev.pageIndex, ev.pageSize);
    // this.resumeService.paginate(ev.pageIndex, ev.pageSize, )
  }

}
