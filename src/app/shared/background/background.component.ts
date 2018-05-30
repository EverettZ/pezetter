import { IResumeItem } from './../models/card-model';
import { Component, Input, ViewChildren, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { ParallaxerConfig } from '../../directives/parallaxer.config';
import { ResumeService } from '../../services/resume/resume.service';
import { IResumeCategory } from '../models/card-model';

@Component({
  selector: 'pez-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit {

  aConfig: ParallaxerConfig = {
    xMax: -20,
    yMax: -26,
    increment: 1
  };

  bConfig: ParallaxerConfig = {
    xMax: -20,
    yMax: 26,
    increment: 1
  };

  cConfig: ParallaxerConfig = {
    xMax: -50,
    yMax: -55,
    increment: 3
  };

  dConfig: ParallaxerConfig = {
    xMax: 50,
    yMax: -55,
    increment: 2
  };


  constructor() {


  }

  ngAfterViewInit() {

  }

}
