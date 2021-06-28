import { Injectable, NestMiddleware } from "@nestjs/common";
import { bootstrap } from "../bootstrap";

@Injectable()
export class AppMiddleware implements NestMiddleware {
    // eslint-disable-next-line no-useless-constructor
    constructor(private expressInstance: Express.Application) { }
    use(_req: any, _res: any, _next: () => void) {
        return bootstrap(this.expressInstance);
    }
}