import { MyDatePipePipe } from './my-date-pipe.pipe';

describe('MyDatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new MyDatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
