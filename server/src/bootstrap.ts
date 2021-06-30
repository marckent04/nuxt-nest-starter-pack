import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { appValidationRequestPipe } from '@/server/src/common/ValidationPipe'
export const bootstrap = async (express?: Express.Application) => {
    let app;

    if (express) {
        app = await NestFactory.create(AppModule, new ExpressAdapter(express));
        app.setGlobalPrefix("api")
    } else {
        app = await NestFactory.create(AppModule);
    }
    // app.useGlobalPipes(appValidationRequestPipe);
    const config = new DocumentBuilder()
        .setTitle('Api')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    if (express) {
        await app.init();
    }

    return app;
};