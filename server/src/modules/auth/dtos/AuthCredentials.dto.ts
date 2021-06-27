import { Role } from "../../../enums/Role.enum";

export class AuthCredentialsDto {
  password: string;

  email: string;

  remember_me?: boolean;

  role: Role;
}
