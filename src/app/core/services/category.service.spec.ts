import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';


describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryService = TestBed.inject(CategoryService);
    expect(service).toBeTruthy();
  });
});
