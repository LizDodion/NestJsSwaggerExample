import { validate } from 'class-validator';
import {
  HealthcheckInput,
  HealthcheckPingDatabaseInput,
  HealthCheckSlackInput,
  HealthcheckMessageResponse,
} from '.';

describe('HealthCheckInput', () => {
  it('should accept message and optionalMessage properties', async () => {
    const input = new HealthcheckInput();
    Object.assign(input, {
      optionalMessage: 'a',
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'matches',
      'optionalMessage must match /^[a-zA-Z0-9 ]{4,20}$/ regular expression',
    );
  });
});

describe('HealthcheckPingDatabaseInput', () => {
  it('should accept message and optionalMessage properties', async () => {
    const input = new HealthcheckPingDatabaseInput();
    Object.assign(input, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });
});

describe('HealthCheckSlackInput', () => {
  it('should accept message and optionalMessage properties', async () => {
    const input = new HealthCheckSlackInput();
    Object.assign(input, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });
});

describe('HealthcheckMessageResponse', () => {
  it('should accept message and optionalMessage properties', async () => {
    const input = new HealthcheckMessageResponse();
    Object.assign(input, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });
});
