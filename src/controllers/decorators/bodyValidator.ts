import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler, Request, Response, NextFunction } from "express";


export function bodyValidator2(...keys: string[]) {

  function func(validationKeys: string[]): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
      if (!req.body) {
        res.status(400).send("Invalid request");
        return;
      }

      for (let key of validationKeys) {
        if (!req.body[key]) {
          res.status(422).send(`Missing property ${key}`);
          return;
        }
      }

      next();
    };
  }

  return function(target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, func(keys), target, key)
  }
}

export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key)
  }
}