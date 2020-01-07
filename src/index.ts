import express from 'express'
import cookieSession from 'cookie-session'
import { AppRouterSingleton } from './appRouter';
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieSession({keys: ['keys']}))
app.use(AppRouterSingleton.getInstance())

app.listen(3000, () => console.log('Listening'))
