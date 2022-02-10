import { EntityRepository, Repository } from 'typeorm';
import { CreateActorDto } from '@dtos/actors.dto';
import { HttpException } from '@exceptions/HttpException';
import { Actor } from '@interfaces/actors.interface';
import { isEmpty } from '@utils/util';
import { ActorEntity } from '@entities/actor.entity';
import { User } from '@interfaces/users.interface';

@EntityRepository()
class ActorService extends Repository<ActorEntity> {
  public async findAllActors(): Promise<Actor[]> {
    const actors: Actor[] = await ActorEntity.find({ where: { isVisible: true } });
    return actors;
  }

  public async findMyAllActors(userData: User): Promise<Actor[]> {
    const actors: Actor[] = await ActorEntity.find({ where: { creatorId: userData.id } });
    return actors;
  }

  public async findActorById(actorId: number): Promise<Actor> {
    if (isEmpty(actorId)) throw new HttpException(400, "You're not actorId");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    if (!findActor.isVisible) throw new HttpException(401, 'Actor is hidden by Creator');

    return findActor;
  }

  public async findMyActorById(actorId: number, userData: User): Promise<Actor> {
    if (isEmpty(actorId)) throw new HttpException(400, "You're not actorId");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    if (findActor.creatorId !== userData.id) throw new HttpException(401, 'You are not Creator');

    return findActor;
  }

  public async createActor(actorData: CreateActorDto, userData: User): Promise<Actor> {
    if (isEmpty(actorData)) throw new HttpException(400, "You're not actorData");

    const findActor: Actor = await ActorEntity.findOne({ where: { fullName: actorData.fullName } });
    if (findActor) throw new HttpException(409, `You're actor ${actorData.fullName} already exists`);

    const createActorData: Actor = await ActorEntity.create({ ...actorData, creatorId: userData.id }).save();

    return createActorData;
  }

  public async updateActor(actorId: number, actorData: CreateActorDto, userData: User): Promise<Actor> {
    if (isEmpty(actorData)) throw new HttpException(400, "You're not actorData");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    if (userData.id !== findActor.creatorId) {
      throw new HttpException(401, "You're not owner");
    }
    const findActorName: Actor = await ActorEntity.findOne({ where: { fullName: actorData.fullName } });
    if (findActorName && findActor.id != actorId) throw new HttpException(409, `You're actor ${actorData.fullName} already exists`);

    await ActorEntity.update(actorId, actorData);

    const updateActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    return updateActor;
  }

  public async deleteActor(actorId: number, userData: User): Promise<Actor> {
    if (isEmpty(actorId)) throw new HttpException(400, "You're not actorId");

    const findActor: Actor = await ActorEntity.findOne({ where: { id: actorId } });
    if (!findActor) throw new HttpException(409, "You're not actor");

    if (userData.id !== findActor.creatorId) {
      throw new HttpException(401, "You're not owner");
    }

    await ActorEntity.delete({ id: actorId });
    return findActor;
  }
}

export default ActorService;
