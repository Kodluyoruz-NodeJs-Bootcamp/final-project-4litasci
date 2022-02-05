import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import SocialController from '@controllers/social.auth.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { SocialAuthDto } from '@dtos/social.auth.dto';

class SocialRoute implements Routes {
  public path = '/social';
  public router = Router();
  public socialController = new SocialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/facebook`, this.socialController.getFacebookAuthUrl);
    this.router.post(`${this.path}/facebook`, validationMiddleware(SocialAuthDto, 'body'), this.socialController.validateFacebookAuth);
    this.router.get(`${this.path}/google`, this.socialController.getGoogleAuthUrl);
    this.router.post(`${this.path}/google`, validationMiddleware(SocialAuthDto, 'body'), this.socialController.validateGoogleAuth);
  }
}

export default SocialRoute;
