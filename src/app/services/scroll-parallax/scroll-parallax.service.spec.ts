import { TestBed, inject } from '@angular/core/testing';

import { ScrollParallaxService } from './scroll-parallax.service';

describe('ScrollParallaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollParallaxService]
    });
  });

  it('should be created', inject([ScrollParallaxService], (service: ScrollParallaxService) => {
    expect(service).toBeTruthy();
  }));
});
