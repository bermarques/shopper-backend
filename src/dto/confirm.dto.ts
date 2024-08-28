import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { IsWaterOrGas } from "../decorators/is-water-or-gas.decorator";

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
  @IsWaterOrGas()
  measure_type: string;
}
