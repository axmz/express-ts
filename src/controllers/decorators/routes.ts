import 'reflect-metadata'
import { RequestHandler } from "express";
import {Methods} from './Methods'
import {MetadataKeys} from './MetadataKeys'

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

function routeBinder (method: Methods) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
    }
  }
}

export const get = routeBinder(Methods.GET)
export const post = routeBinder(Methods.POST)