import { ApiProperty } from '@nestjs/swagger';

export class Dog {
  /**
   * The name of the Dog
   * @example Doggy
   */
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Dog' })
  age: number;

  @ApiProperty({
    example: 'Labradoodle',
    description: 'The breed of the Dog',
  })
  breed: string;
}
