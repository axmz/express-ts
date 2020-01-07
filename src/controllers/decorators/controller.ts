import "reflect-metadata";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { MetadataKeys } from "./MetadataKeys";
import { AppRouterSingleton } from "../../appRouter";
import { Methods } from "./Methods";
import { bodyValidator2 } from "./bodyValidator";

// function bodyValidator(validationKeys: string[]): RequestHandler {
//   return function(req: Request, res: Response, next: NextFunction) {
//     if (!req.body) {
//       res.status(400).send("Invalid request");
//       return;
//     }

//     for (let key of validationKeys) {
//       if (!req.body[key]) {
//         res.status(422).send(`Missing property ${key}`);
//         return;
//       }
//     }

//     next();
//   };
// }

export function controller(routePrefix: string) {
  return function(target: any) {
    const router = AppRouterSingleton.getInstance();

    for (let key in target.prototype) {
      const handler = target.prototype[key];
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];
      const validator =
        Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
        [];
      // const requiredBodyProps =
      //   Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
      //   [];
      // const validator = bodyValidator(requiredBodyProps);

      if (path) {
        router[method](
          routePrefix + path,
          [...middlewares],
          validator,
          handler
        );
      }
    }
  };
}
