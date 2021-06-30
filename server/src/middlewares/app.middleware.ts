import { Injectable, NestMiddleware } from "@nestjs/common";
import { bootstrap } from "../bootstrap";
import * as express from 'express'
@Injectable()
export class AppMiddleware implements NestMiddleware {
    // eslint-disable-next-line no-useless-constructor
    constructor(private expressInstance: Express.Application) { }
    use(req: express.Request, _res: express.Response, next: () => void) {
        if (req.url.match("^/api")) {
            return bootstrap(this.expressInstance);
        } else {
            next();
        }
    }
}