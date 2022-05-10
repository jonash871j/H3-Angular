import { TextCensorPipe } from './text-censor.pipe';

describe('TextCensorPipe', () => {
  it('create an instance', () => {
    const pipe = new TextCensorPipe();
    expect(pipe).toBeTruthy();
  });
});
