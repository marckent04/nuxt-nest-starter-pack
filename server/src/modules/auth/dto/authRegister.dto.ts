import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "../../user/dto/create-user.dto";

export class AuthRegisterDto extends CreateUserDto {
  @IsNotEmpty()
  passwordConfirm: string;
}
