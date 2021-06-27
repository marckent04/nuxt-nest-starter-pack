import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @Matches(/^(07|05|01|21|25|27)([0-9]{8})$/, {
    message: "incorrect phone number",
  })
  phone: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
