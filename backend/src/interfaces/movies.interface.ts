import { Actor } from '@interfaces/actors.interface';

export interface Movie {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  creatorId: number;
  isVisible: boolean;
  actors: Actor[];
}
