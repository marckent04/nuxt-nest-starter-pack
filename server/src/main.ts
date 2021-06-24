import { NestFactory } from '@nestjs/core';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from './app.module';
// import { appValidationRequestPipe } from '@/server/src/common/ValidationPipe'
const bootstrap = async (express: Express.Application) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express));
  // app.useGlobalPipes(appValidationRequestPipe);
  await app.init();
  return app;
};

@Injectable()
export class AppMiddleware implements NestMiddleware {
  // eslint-disable-next-line no-useless-constructor
  constructor(private expressInstance: Express.Application) { }
  use(_req: any, _res: any, _next: () => void) {
    return bootstrap(this.expressInstance);
  }
}

