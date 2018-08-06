import { TestBed, inject } from '@angular/core/testing';

import { ResumeResolverService } from './resume-resolver.service';

describe('ResumeResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumeResolverService]
    });
  });

  it('should be created', inject([ResumeResolverService], (service: ResumeResolverService) => {
    expect(service).toBeTruthy();
  }));
});
