import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pez-card-columns',
  templateUrl: './card-columns.component.html',
  styleUrls: ['./card-columns.component.scss']
})
export class CardColumnsComponent implements OnInit {
  @HostBinding('class.card-columns') cardColumns = true;
  constructor() { }

  ngOnInit() {
  }

}
