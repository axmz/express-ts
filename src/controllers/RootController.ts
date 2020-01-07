import { Request, Response, NextFunction } from "express";
import { get, use, controller } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if(req.session && req.session.loggedIn) {
    next()
    return 
  } else {
    res.status(403).send('Forbidden')
  }
}

@controller('')
export class RootController {
  @use(requireAuth)
  sum(a:number, b:number): number {
    return a+b
  }

  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
      <div>Access Granted</div>
      <br>
      <a href="/auth/logout">Logout</a>
    `);
    } else {
      res.send(`
      <div>Pls login</div>
      <br>
      <a href="/auth/login">Login</a>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route')
  }
}
