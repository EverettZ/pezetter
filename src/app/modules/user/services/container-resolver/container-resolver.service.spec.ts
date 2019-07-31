import { TestBed } from '@angular/core/testing';

import { ContainerResolverService } from './container-resolver.service';

describe('ContainerResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerResolverService = TestBed.get(ContainerResolverService);
    expect(service).toBeTruthy();
  });
});
