import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CustomerAuthController } from "./customer-auth/customer-auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { MailModule } from "../mail/mail.module";
import { GeneratorModule } from "../generator/generator.module";

@Module({
  providers: [AuthService],
  controllers: [CustomerAuthController],
  imports: [
    UserModule,
    MailModule,
    GeneratorModule,
    JwtModule.register({
      secret: "my-secret",
      signOptions: { expiresIn: "1d" },
      // secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  exports: [AuthService, UserModule],
})
export class AuthModule { }
