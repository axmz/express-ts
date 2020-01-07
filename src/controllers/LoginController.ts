import { Request, Response } from "express";
import {get, post, controller, bodyValidator, bodyValidator2} from './decorators'

@controller('/auth')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(
      `
        <form method="POST">
          <div>
            <input name="email" type="text"></input>
            <label>Email</label>
          </div>
          <div>
            <input name="password" type="password"></input>
            <label>Password</label>
          </div>
          <br/>
          <button type="submit">SUBMIT</button>
        </form>
      `
    );
  }

  @post('/login')
  // @bodyValidator('email', 'password')
  @bodyValidator2('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password && email === "em" && password === "pass") {
      req.session = {loggedIn: true}
      res.redirect('/')
    } else {
      res.send('Invalid email or pass')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/')
  }
}
