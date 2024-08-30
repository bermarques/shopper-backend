import {
  IsBase64,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { IsWaterOrGas } from "../decorators/is-water-or-gas.decorator";

export class PostUploadDto {
  @IsNotEmpty({ message: "Imagem da medição não pode ser vazia" })
  @IsBase64({}, { message: "Imagem deve ser no formato base 64" })
  image: string;

  @IsNotEmpty({ message: "Código de consumidor não pode ser vazio" })
  @IsString({ message: "Código de consumidor deve ser uma string" })
  customer_code: string;

  @IsNotEmpty({ message: "Data da medição não pode ser vazio" })
  @IsDateString({ strict: true }, { message: "Formato inválido de data" })
  measure_datetime: Date;

  @IsNotEmpty({ message: "Tipo de medição não pode ser vazio" })
  @IsString({ message: "Tipo de medição deve ser uma string" })
  @IsWaterOrGas()
  measure_type: string;
}
