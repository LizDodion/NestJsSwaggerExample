import { Module, Global } from '@nestjs/common';
import { MathUtils } from './utils/math.utils';

@Global()
@Module({
  providers: [MathUtils],
  exports: [MathUtils],
})
export class CommonModule {}
