import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserInput } from "./inputs/update-user.input";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
// import { Roles } from "../../decorators/Role.decorator";
// import { Role } from "../../enums/Role.enum";
// import { JwtPayload } from "../auth/interfaces/Jwt.payload";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  // @Mutation("updateUser")
  // updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

}
