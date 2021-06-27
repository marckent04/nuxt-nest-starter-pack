import { Role } from "../../../enums/Role.enum";

export interface JwtPayload {
  email: string;
  id: number;
  role: Role;
}
