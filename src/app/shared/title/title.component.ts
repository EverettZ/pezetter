import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pez-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() value = '';

  constructor() { }

  ngOnInit() {
  }

}
