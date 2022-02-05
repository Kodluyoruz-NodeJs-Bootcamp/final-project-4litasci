import { IsString } from 'class-validator';

export class FacebookAuthDto {
  @IsString()
  public authCode: string;
}
