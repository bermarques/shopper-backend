import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsWaterOrGasConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    console.log(value);
    return value.toUpperCase() === "WATER" || value.toUpperCase() === "GAS";
  }

  defaultMessage() {
    return 'Tipo de medição deve ser "WATER" ou "GAS"';
  }
}

export function IsWaterOrGas(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsWaterOrGasConstraint,
    });
  };
}
