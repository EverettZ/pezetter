import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'pez-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() size = '';
  @Input() src = '';
  @Input() alt = '';
  @HostBinding('class') get classes() {
    const baseClass = 'pez-avatar-root';
    return this.size.length ? `${baseClass} pez-avatar-${this.size}` : baseClass 
  };
  constructor() { }

  ngOnInit() {
  }

}
