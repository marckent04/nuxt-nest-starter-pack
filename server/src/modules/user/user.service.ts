import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.repo.create(createUserDto);
      const user = await newUser.save();
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async validatePassword(user: User, password: string) {
    return await bcrypt.compare(password, user.password);
  }

  // async findAll() {
  //   return await this.userModel.find();
  // }

  // async findOne(payload: UpdateUserDto) {
  //   try {
  //     return await this.userModel.findOne(payload);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //   }
  // }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const result: UpdateWriteOpResult = await this.userModel.updateOne({ id }, updateUserDto);

  //   if (result.nModified === 0)
  //     throw new HttpException(result, HttpStatus.NOT_FOUND);

  //   return result;
  // }

  // async remove(id: number) {
  //   const result = await this.userModel.remove({ id });

  //   return result;
  // }
}
