import { StudentLevelPipe } from './student-level.pipe';

describe('StudentLevelPipe', () => {
  it('create an instance', () => {
    const pipe = new StudentLevelPipe();
    expect(pipe).toBeTruthy();
  });
});
