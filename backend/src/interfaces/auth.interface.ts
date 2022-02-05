import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface FacebookAuthUser {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
}

export interface GoogleAuthUser {
  email: string;
  given_name: string;
  family_name: string;
  id: string;
}
