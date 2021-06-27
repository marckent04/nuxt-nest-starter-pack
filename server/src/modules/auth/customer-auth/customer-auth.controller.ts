import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { AuthCredentialsDto } from "../dtos/AuthCredentials.dto";
import { Role } from "../../../enums/Role.enum";
import { JwtPayload } from "../interfaces/Jwt.payload";
import { JwtAuthGuard } from "../../../guards/jwt-auth.guard";
import { MailService } from "../../mail/mail.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { PasswordForgottenDto } from "../dtos/PasswordForgotten.dto";

@Controller("auth/user")
export class CustomerAuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post("register")
  registerUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.userRegister(createUserDto);
  }

  @Post("login")
  userLogin(
    @Body()
    credentials: AuthCredentialsDto,
  ): any {
    return this.authService.userLogin(credentials);
  }

  @Post("password-forgotten")
  passwordForgotten(@Body() dto: PasswordForgottenDto) {
    return this.authService.userPasswordForgotten(dto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // user(@Context("id") id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Customer)
  // authenticatedUser(@Context("user") user: JwtPayload) {
  //   return this.userService.findOne(user.id);
  // }
}
function Context(arg0: string) {
  throw new Error("Function not implemented.");
}

