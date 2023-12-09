import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class FirstMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        console.log("Primer Middleware en Nest")
        next()
    }
}
