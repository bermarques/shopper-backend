import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class PatchConfirmDto {
  @IsNotEmpty({ message: "Uuid não pode ser vazio" })
  @IsString({ message: "Uuid deve ser uma string" })
  measure_uuid: string;

  @IsNotEmpty({ message: "Valor de confirmação não pode ser vazio" })
  @IsInt({ message: "Valor de confirmação deve ser um número" })
  confirmed_value: number;
}
