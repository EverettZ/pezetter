import { Directive, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
import { style } from '@angular/animations';
import limitContent from './limit-content';

@Directive({
  selector: '[pezMaxLengthEtc]'
})
export class MaxLengthEtcDirective implements AfterViewInit {
  @Input('pezMaxLengthEtc') pezMaxLengthEtc: number = 100;

  constructor(private el: ElementRef) {
  }
  
  ngAfterViewInit() {
    const currContent: string = this.el.nativeElement.innerText || ''; 
    this.el.nativeElement.innerText = limitContent(currContent, this.pezMaxLengthEtc)
  }


}
