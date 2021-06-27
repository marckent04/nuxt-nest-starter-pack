import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import express from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  getHello(@Res() res: express.Response) {
    return res.json({ message: 'Hello World' });
  }

  @Get("bye")
  goodBye(@Res() res: express.Response) {
    console.log("good");
    return res.json({ message: 'Goodbye' });
  }
}
