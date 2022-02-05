import { NextFunction, Request, Response } from 'express';
import { facebookLoginUrl } from '@/socialauth/facebook-url';
import axios from 'axios';
import { SocialAuthDto } from '@dtos/social.auth.dto';
import config from 'config';
import userService from '@services/users.service';
import { googleLoginUrl } from '@/socialauth/google-url';

class SocialController {
  public userService = new userService();
  public getFacebookAuthUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const facebookUrl = facebookLoginUrl;
      res.status(200).json({ data: facebookUrl, message: 'facebookUrl' });
    } catch (error) {
      next(error);
    }
  };

  public validateFacebookAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SocialAuthDto = req.body;
      const authCode = userData.authCode;
      const { data } = await axios({
        url: 'https://graph.facebook.com/v4.0/oauth/access_token',
        method: 'get',
        params: {
          client_id: config.get('facebookAuthID'),
          client_secret: config.get('facebookAuthSecret'),
          redirect_uri: 'http://localhost:3001/authenticate/facebook/',
          code: authCode,
        },
      });
      console.log(data);

      const fieldData = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
          fields: ['email', 'first_name', 'last_name'].join(','),
          access_token: data.access_token,
        },
      });

      const { cookie, findUser, token } = await this.userService.validateFacebookUser(fieldData.data);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { findUser, token }, message: 'facebook login' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getGoogleAuthUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const googleUrl = googleLoginUrl;
      res.status(200).json({ data: googleUrl, message: 'googleUrl' });
    } catch (error) {
      next(error);
    }
  };

  public validateGoogleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: SocialAuthDto = req.body;
      const authCode = userData.authCode;
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: config.get('googleClientID'),
          client_secret: config.get('googleClientSecret'),
          redirect_uri: 'http://localhost:3001/authenticate/google/',
          grant_type: 'authorization_code',
          code: authCode,
        },
      });
      console.log(data);

      const fieldData = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const { cookie, findUser, token } = await this.userService.validateGoogleUser(fieldData.data);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { findUser, token }, message: 'google login' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default SocialController;
