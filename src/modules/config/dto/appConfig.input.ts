import { Transform, Expose as ProvideToContainer } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

const booleanStringTransform = ({
  value,
}: {
  value: string | boolean;
}): string | boolean => {
  if (value === "true" || value === "false") {
    // convert to real boolean
    return JSON.parse(value);
  }

  return value;
};

export class AppConfigInput {
  @IsString()
  @IsNotEmpty()
  @ProvideToContainer()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  @ProvideToContainer()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  @ProvideToContainer()
  JWT_EXPIRES_IN: string;

  // Accepts boolean or string: 'true' or 'false' or true or false
  @Transform(booleanStringTransform)
  @IsNotEmpty()
  @IsBoolean()
  @ProvideToContainer()
  IS_PRISMA_LOG_ENABLED: boolean;

  // Accepts boolean or string: 'true' or 'false' or true or false.
  @Transform(booleanStringTransform)
  @IsNotEmpty()
  @IsBoolean()
  @ProvideToContainer()
  IS_GRAPHQL_QUERY_LOG_ENABLED: boolean;

  @IsString()
  @IsNotEmpty()
  ELINKS_ENV: string;

  @IsString()
  @IsNotEmpty()
  ELINKS_ADMIN_TOKEN: string;
}
