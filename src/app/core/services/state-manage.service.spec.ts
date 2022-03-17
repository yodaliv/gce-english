import { TestBed } from '@angular/core/testing';

import { StateManageService } from './state-manage.service';

describe('StateManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateManageService = TestBed.inject(StateManageService);
    expect(service).toBeTruthy();
  });
});
