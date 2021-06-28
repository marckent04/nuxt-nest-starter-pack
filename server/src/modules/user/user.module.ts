
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { userProviders } from "./entities/user.providers";

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule { }
