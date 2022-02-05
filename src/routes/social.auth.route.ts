import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import SocialController from '@controllers/social.auth.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { FacebookAuthDto } from '@dtos/facebook.auth.dto';

class SocialRoute implements Routes {
  public path = '/social';
  public router = Router();
  public socialController = new SocialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/facebook`, this.socialController.getFacebookAuthUrl);
    this.router.post(`${this.path}/facebook`, validationMiddleware(FacebookAuthDto, 'body'), this.socialController.validateFacebookAuth);
  }
}

export default SocialRoute;
