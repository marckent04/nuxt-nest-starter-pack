import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { Role } from "../../enums/Role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY')
  private usersRepository: Repository<User>) { }

  public readonly ROLE: Role = Role.Customer;

  create(createUserInput: CreateUserDto) {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findOneByCriteria(payload: CreateUserDto) {
    return await this.usersRepository.findOne(payload);
  }

  async findByCriteria(payload: CreateUserDto) {
    return await this.usersRepository.find(payload);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
