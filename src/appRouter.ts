import {Router} from 'express'

export class AppRouterSingleton {
  private static instance: Router 

  private constructor() {}

  public static getInstance() {
    if(!AppRouterSingleton.instance) {
      AppRouterSingleton.instance = Router()
    }
    return AppRouterSingleton.instance
  }
}