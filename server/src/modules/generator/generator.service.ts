import { Injectable } from "@nestjs/common";

@Injectable()
export class GeneratorService {
  private get randomCode() {
    return Math.floor(Math.random() * 10000).toString();
  }

  newPassword(): string {
    return this.randomCode;
  }
}
