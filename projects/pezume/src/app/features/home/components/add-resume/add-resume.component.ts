import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume/resume.service';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { Observable, of, from } from 'rxjs';
import { map, tap, switchMap, mapTo, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'pez-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  @HostBinding('class.card') card = true;
  canAdd$: Observable<boolean>;
  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private auth: AuthProcessService,
    private snackBar: MatSnackBar
  ) {

    this.canAdd$ = auth.user$.pipe(
      map((user) => {
        return user ? true : false;
      })
    )
  }

  ngOnInit() {
  }

  addResume() {

    const addResumeResult = from(this.resumeService.intializeNewResume()).pipe(
      map((result) => {
        if (result && result.id) {
          return result.id;
        }
        return false;
      })
    )

    const snackBarResult = this.canAdd$.pipe(
      switchMap((canAdd) => {
        if (!canAdd) {
          const snackBarRef = this.snackBar.open('Login or create an account to add a resume', "Login", { duration: 5000 });
          return snackBarRef.onAction().pipe(
            mapTo(false)
          );
        }
        return addResumeResult;
      })
    );

    snackBarResult.pipe(
      take(1)
    ).subscribe((result) => {
      if (!result) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/resume', result]);
      }
    })
  }

}
