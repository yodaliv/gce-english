import { TestBed } from '@angular/core/testing';

import { LevelService } from './level.service';

describe('LevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelService = TestBed.inject(LevelService);
    expect(service).toBeTruthy();
  });
});
