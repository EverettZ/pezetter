import { Component, OnInit, Input } from '@angular/core';
import { QuestionCategory } from '../../utils/question-category';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pez-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss']
})
export class QuestionCategoryComponent implements OnInit {

  @Input() questionCategory: QuestionCategory;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
