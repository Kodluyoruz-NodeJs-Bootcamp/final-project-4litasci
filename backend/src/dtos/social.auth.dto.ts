import { IsString } from 'class-validator';

export class SocialAuthDto {
  @IsString()
  public authCode: string;
}
