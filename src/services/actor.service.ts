import { EntityRepository, Repository } from 'typeorm';
import { CreateActorDto } from '@dtos/actors.dto';
import { HttpException } from '@exceptions/HttpException';
import { Actor } from '@interfaces/actors.interface';
import { isEmpty } from '@utils/util';
import { ActorEntity } from '@entities/actor.entity';

@EntityRepository()
class ActorService extends Repository<ActorEntity> {
  public async findAllActors(): Promise<Actor[]> {
    const actors: Actor[] = await ActorEntity.find();
    return actors;
  }

  public async findActorById(actorId: number): Promise<Actor> {
    if (isEmpty(actorId)) throw new HttpException(400, "You're not actorId");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    return findActor;
  }

  public async createActor(actorData: CreateActorDto): Promise<Actor> {
    if (isEmpty(actorData)) throw new HttpException(400, "You're not actorData");

    const findActor: Actor = await ActorEntity.findOne({ where: { fullName: actorData.fullName } });
    if (findActor) throw new HttpException(409, `You're actor ${actorData.fullName} already exists`);

    const createActorData: Actor = await ActorEntity.create(actorData).save();

    return createActorData;
  }

  public async updateActor(actorId: number, actorData: CreateActorDto): Promise<Actor> {
    if (isEmpty(actorData)) throw new HttpException(400, "You're not actorData");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    await ActorEntity.update(actorId, actorData);

    const updateActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    return updateActor;
  }

  public async deleteActor(actorId: number): Promise<Actor> {
    if (isEmpty(actorId)) throw new HttpException(400, "You're not actorId");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    await ActorEntity.delete({ id: actorId });
    return findActor;
  }
}

export default ActorService;
