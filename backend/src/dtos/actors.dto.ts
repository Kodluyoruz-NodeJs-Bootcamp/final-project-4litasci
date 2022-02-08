import { IsBoolean, IsString, IsUrl } from 'class-validator';

export class CreateActorDto {
  @IsString()
  fullName: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isVisible: boolean;
}
