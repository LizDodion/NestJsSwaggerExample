import { webcrypto, randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MathUtils {
  generateRandomDigitNumber(): number {
    return webcrypto.getRandomValues(new Uint32Array(1))[0] % 10;
  }

  generateRandomCodeFourDigits(): string {
    return [0, 0, 0, 0].map(() => this.generateRandomDigitNumber()).join('');
  }

  generateRandomHashForRequestId(): string {
    return randomUUID().slice(0, 8);
  }

  generateRandomPassword(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    const randomBytes = new Uint8Array(length);
    const random = webcrypto.getRandomValues(randomBytes);

    for (let i = 0; i < length; i++) {
      const randomCharIndex = random[i] % characters.length;
      password += characters.charAt(randomCharIndex);
    }
    return password;
  }
}
