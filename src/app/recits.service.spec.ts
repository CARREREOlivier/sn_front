import { TestBed } from '@angular/core/testing';

import { RecitsService } from './recits.service';

describe('RecitsService', () => {
  let service: RecitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
