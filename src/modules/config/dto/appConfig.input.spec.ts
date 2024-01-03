import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AppConfigInput } from './appConfig.input';

describe('UpdateUserProfileInput', () => {
  it('should error if DATABASE_URL is empty', async () => {
    const input = plainToClass(AppConfigInput, {
      DATABASE_URL: '',
    });
    const errors = validateSync(input).filter(
      (item) => item.property === 'DATABASE_URL',
    );

    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'DATABASE_URL should not be empty',
    );
  });

  it('should error if DATABASE_URL is not a string', async () => {
    const input = plainToClass(AppConfigInput, {
      DATABASE_URL: 123,
    });
    const errors = validateSync(input).filter(
      (item) => item.property === 'DATABASE_URL',
    );

    expect(errors[0].constraints).toHaveProperty(
      'isString',
      'DATABASE_URL must be a string',
    );
  });

  it('should error if IS_SMS_DISABLED is not a boolean', async () => {
    const input = plainToClass(AppConfigInput, {
      IS_SMS_DISABLED: 'Hello World!',
    });
    const errors = validateSync(input).filter(
      (item) => item.property === 'IS_SMS_DISABLED',
    );

    expect(errors[0].constraints).toHaveProperty(
      'isBoolean',
      'IS_SMS_DISABLED must be a boolean value',
    );
  });

  it('should transform IS_SMS_DISABLED to truthy boolean', async () => {
    const input = plainToClass(AppConfigInput, {
      IS_SMS_DISABLED: 'true',
    });

    validateSync(input).filter((item) => item.property === 'IS_SMS_DISABLED');

    expect(input.IS_SMS_DISABLED).toBe(true);
  });

  it('should transform IS_SMS_DISABLED to falsy boolean', async () => {
    const input = plainToClass(AppConfigInput, {
      IS_SMS_DISABLED: 'false',
    });

    validateSync(input).filter((item) => item.property === 'IS_SMS_DISABLED');

    expect(input.IS_SMS_DISABLED).toBe(false);
  });

  it('should error if AGORA_REST_DOMAIN is not a url', async () => {
    const input = plainToClass(AppConfigInput, {
      AGORA_REST_DOMAIN: '123',
    });
    const errors = validateSync(input).filter(
      (item) => item.property === 'AGORA_REST_DOMAIN',
    );

    expect(errors[0].constraints).toHaveProperty(
      'isUrl',
      'AGORA_REST_DOMAIN must be a URL address',
    );
  });
});
