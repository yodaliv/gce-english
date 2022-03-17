import { EmailHashPipe } from './email-hash.pipe';

describe('EmailHashPipe', () => {
  it('create an instance', () => {
    const pipe = new EmailHashPipe();
    expect(pipe).toBeTruthy();
  });
});
