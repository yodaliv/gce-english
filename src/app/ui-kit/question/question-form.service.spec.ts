import { TestBed } from '@angular/core/testing';
import { QuestionFormService } from './question-form.service';


describe('QuestionFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionFormService = TestBed.inject(QuestionFormService);
    expect(service).toBeTruthy();
  });
});
