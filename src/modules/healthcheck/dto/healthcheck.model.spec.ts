import { validate } from 'class-validator';
import { Message } from '.';

describe('Message', () => {
  it('should have message and datetime properties', async () => {
    const input = new Message();
    Object.assign(input, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
    // expect(errors[0].constraints).toHaveProperty(
    //   'matches',
    //   'optionalMessage must match /^[a-zA-Z0-9 ]{4,20}$/ regular expression',
    // );
  });
});
