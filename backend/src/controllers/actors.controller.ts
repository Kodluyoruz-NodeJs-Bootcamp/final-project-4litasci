import { NextFunction, Request, Response } from 'express';
import ActorService from '@services/actor.service';
import { Actor } from '@interfaces/actors.interface';
import { CreateActorDto } from '@dtos/actors.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { UserEntity } from '@entities/users.entity';
import { User } from '@interfaces/users.interface';

class ActorsController {
  public actorService = new ActorService();

  public getActors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllActorsData: Actor[] = await this.actorService.findAllActors();

      res.status(200).json({ data: findAllActorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMyActors = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllActorsData: Actor[] = await this.actorService.findMyAllActors(req.user);

      res.status(200).json({ data: findAllActorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getActorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const findOneActorData: Actor = await this.actorService.findActorById(actorId);
      const getCreatorData: User = await UserEntity.findOne({ where: { id: findOneActorData.creatorId } });

      res.status(200).json({ data: { ...findOneActorData, creatorName: getCreatorData.fullName }, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getMyActorById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const findOneActorData: Actor = await this.actorService.findMyActorById(actorId, req.user);

      res.status(200).json({ data: findOneActorData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createActor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateActorDto = req.body;
      const createActorData: Actor = await this.actorService.createActor(userData, req.user);

      res.status(201).json({ data: createActorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateActor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const userData: CreateActorDto = req.body;
      const updateActorData: Actor = await this.actorService.updateActor(actorId, userData, req.user);

      res.status(200).json({ data: updateActorData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteActor = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const deleteActorData: Actor = await this.actorService.deleteActor(actorId, req.user);

      res.status(200).json({ data: deleteActorData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ActorsController;
