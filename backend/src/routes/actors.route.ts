import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ActorsController from '@controllers/actors.controller';
import { CreateActorDto } from '@dtos/actors.dto';
import authMiddleware from '@middlewares/auth.middleware';

class ActorsRoute implements Routes {
  public path = '/actors';
  public router = Router();
  public actorsController = new ActorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.actorsController.getActors);
    this.router.get(`${this.path}/:id(\\d+)`, this.actorsController.getActorById);
    this.router.get(`${this.path}/my/:id(\\d+)`, authMiddleware, this.actorsController.getMyActorById);
    this.router.get(`${this.path}/my`, authMiddleware, this.actorsController.getMyActors);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateActorDto, 'body'), this.actorsController.createActor);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateActorDto, 'body', true), this.actorsController.updateActor);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.actorsController.deleteActor);
  }
}

export default ActorsRoute;
