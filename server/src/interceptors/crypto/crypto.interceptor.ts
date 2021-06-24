import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { myCrypt } from "../../interceptors/crypto/crypto";

@Injectable()
export class CryptoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const req: Request = ctx.getRequest();
    if (typeof req.body.data === "string") req.body = myCrypt.decrypt(req.body);

    return next.handle().pipe(
      map((data: any) => {
        console.log(data);

        return myCrypt.encrypt(data);
      }),
    );
  }
}
