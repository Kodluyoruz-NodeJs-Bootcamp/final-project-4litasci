import { IsString, IsUrl } from 'class-validator';

export class CreateActorDto {
  @IsString()
  fullName: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}
