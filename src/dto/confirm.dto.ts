import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class PostConfirmDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsNotEmpty()
  @IsDate()
  measure_datetime: Date;

  @IsNotEmpty()
  @IsString()
  measure_type: string;
}
