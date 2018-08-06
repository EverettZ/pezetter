import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pez-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  avatarValue = "url('https://material.angular.io/assets/img/examples/shiba1.jpg')";

  @Input('avatar')
  set avatar(val: string) {
    this.avatarValue = `url(${val})`;
  }
  get avatar() {
    return this.avatarValue;
  }

  constructor() { }

  ngOnInit() {
  }

}
