import { IsQuestionAllAnsweredPipe } from './is-question-all-answered.pipe';

describe('IsQuestionAllAnsweredPipe', () => {
  it('create an instance', () => {
    const pipe = new IsQuestionAllAnsweredPipe();
    expect(pipe).toBeTruthy();
  });
});
