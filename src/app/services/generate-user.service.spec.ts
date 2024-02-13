import { TestBed } from '@angular/core/testing';

import { GenerateUserService } from './generate-user.service';

describe('GenerateUserService', () => {
  let service: GenerateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
