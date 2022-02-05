import { NextFunction, Request, Response } from 'express';
import { facebookLoginUrl } from '@/socialauth/facebook-url';
import axios from 'axios';
import { FacebookAuthDto } from '@dtos/facebook.auth.dto';
import config from 'config';
import userService from '@services/users.service';

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
      console.log('data');
      const userData: FacebookAuthDto = req.body;
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
}

export default SocialController;
