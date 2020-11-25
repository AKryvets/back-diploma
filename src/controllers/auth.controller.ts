import { Router,  Request, Response } from 'express';
import {getAccessTokenFromCode, getUserInfo, urlGoogle} from '../utils/google-utils';
import { AuthService } from '../services';


export class AuthController {
  public path = '/auth';
  public router = Router();
  public authService = new AuthService();

  constructor() {
    this.initRoutes();
  }
  public initRoutes() {
    this.router.get(`/login/google`, this.loginGoogle);
    this.router.get(`/confirm-login/google`, this.confirmLoginGoogle);


    this.router.post(`/register`, this.register);
    this.router.post(`/confirm-auth`, this.confirmAuth);
  }

  loginGoogle = async (request: Request, response: Response) => {
    const url = urlGoogle();
    this.authService.loginGoogle()
    response.json(url);
  };

  confirmLoginGoogle = async (request: Request, response: Response) => {
    const { code } = request.query;
    const token = await getAccessTokenFromCode(code);
    const user = await getUserInfo(token);
    console.log(user, 'user');
    response.json(user);
  };

  confirmAuth = (request: Request, response: Response) => {
    console.log(request)
    response.send('confirmAuth');
  };

  register = (request: Request, response: Response) => {
    response.send('register');
  };
}

