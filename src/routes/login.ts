import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if(req.session && req.session.loggedIn) {
    next()
    return 
  } else {
    res.status(403).send('Forbidden')
  }
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send(`
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
  `);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === "em" && password === "pass") {
    req.session = {loggedIn: true}
    res.redirect('/')
  } else {
    res.send('Invalid email or pass')
  }
});

router.get('/', (req, res) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>Access Granted</div>
      <br>
      <a href="/logout">Logout</a>
    `)
  } else {
    res.send(`
      <div>Pls login</div>
      <br>
      <a href="/login">Login</a>
    `)
  }
})

router.get('/logout', (req,res) => {
  req.session = undefined;
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route')
})

export { router };
