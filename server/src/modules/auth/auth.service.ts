import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { genSaltSync } from "bcrypt";
import { AuthCredentialsDto } from "./dtos/AuthCredentials.dto";
import { JwtPayload } from "./interfaces/Jwt.payload";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { MailService } from "../mail/mail.service";
import { Role } from "../../enums/Role.enum";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { PasswordForgottenDto } from "./dtos/PasswordForgotten.dto";
import { GeneratorService } from "../generator/generator.service";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly generatorService: GeneratorService
  ) { }

  public validatePassword(password: string, hasPassword: string): boolean {
    return bcrypt.compareSync(password, hasPassword);
  }

  public hashPassword(password: string) {
    const salt = genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  public async commonLogin<T extends UserService>(
    credentials: AuthCredentialsDto,
    service: T,
  ) {
    const infos = await service["findByEmail"](credentials.email);
    // const infos = await service["findByPhone"](credentials.email);

    if (!infos) return new UnauthorizedException("incorrect credentials");

    if (!this.validatePassword(credentials.password, infos.password))
      return new UnauthorizedException("incorrect credentials");

    const payload: JwtPayload = {
      email: infos.email,
      id: infos.id,
      role: service.ROLE,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async userRegister(createUserDto: CreateUserDto) {
    createUserDto.password = this.hashPassword(
      createUserDto.password,
    );

    try {
      const user = await this.userService.create(createUserDto);
      await this.mailService.registerSuccessful(user);
      return user;
    } catch (error) {
      console.log(error.code);

      if (error.code == "ER_DUP_ENTRY") {
        return new BadRequestException("Numero de téléphone ou email deja utilisé")
      }
      return new BadRequestException("une erreur est survenue")
    }
  }

  public userLogin(credentials: AuthCredentialsDto) {
    if (!credentials) throw new BadRequestException("Incorrect credentials");

    credentials.role = Role.Customer;

    return this.commonLogin<UserService>(
      credentials,
      this.userService
    );
  }

  public async userPasswordForgotten(dto: PasswordForgottenDto) {
    const user = await this.userService.findOneByCriteria(dto as any);

    this.userService.update
    if (!user)
      return new BadRequestException("User not found");

    const newPassword = this.generatorService.newPassword();

    user.password = this.hashPassword(newPassword);

    const updatedUser = await user.save();

    await this.mailService.passwordForgotten(user, newPassword);



    return updatedUser;
  }
}
