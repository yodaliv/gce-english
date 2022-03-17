import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';


describe('StudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentService = TestBed.inject(StudentService);
    expect(service).toBeTruthy();
  });
});
