import { Router,  Request, Response } from 'express';
import { AuthService } from '../../services';


export class AuthController {
  public path = '/auth';
  public router = Router();
  public authService = new AuthService();

  constructor() {
    this.initRoutes();
  }
  public initRoutes() {
    this.router.get(`/google`, this.authGoogle);
    this.router.get(`/confirm/google`, this.confirmAuthGoogle);
  }

  authGoogle = async (request: Request, response: Response) => {
    const url = await this.authService.authGoogle();
    response.json(url);
  };

  confirmAuthGoogle = async (request: Request, response: Response) => {
    const { code } = request.query;
    const user = await this.authService.confirmAuthGoogle(code as string);
    response.json(user)
  };
}

