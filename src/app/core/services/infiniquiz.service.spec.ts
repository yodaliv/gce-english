import { TestBed } from '@angular/core/testing';
import { InfiniquizService } from './infiniquiz.service';


describe('InfiniquizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfiniquizService = TestBed.inject(InfiniquizService);
    expect(service).toBeTruthy();
  });
});
