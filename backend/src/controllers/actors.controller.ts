import { NextFunction, Request, Response } from 'express';
import ActorService from '@services/actor.service';
import { Actor } from '@interfaces/actors.interface';
import { CreateActorDto } from '@dtos/actors.dto';

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

  public getActorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const findOneActorData: Actor = await this.actorService.findActorById(actorId);

      res.status(200).json({ data: findOneActorData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateActorDto = req.body;
      const createActorData: Actor = await this.actorService.createActor(userData);

      res.status(201).json({ data: createActorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const userData: CreateActorDto = req.body;
      const updateActorData: Actor = await this.actorService.updateActor(actorId, userData);

      res.status(200).json({ data: updateActorData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = Number(req.params.id);
      const deleteActorData: Actor = await this.actorService.deleteActor(actorId);

      res.status(200).json({ data: deleteActorData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ActorsController;
