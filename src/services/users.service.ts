import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { DataStoredInToken, FacebookAuthUser, TokenData } from '@interfaces/auth.interface';
import config from 'config';
import { sign } from 'jsonwebtoken';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword, provider: 1 }).save();

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserEntity.delete({ id: userId });
    return findUser;
  }

  public async validateFacebookUser(facebookUser: FacebookAuthUser): Promise<{ cookie: string; findUser: User; token: string }> {
    if (isEmpty(facebookUser.email)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { email: facebookUser.email } });
    if (!findUser) {
      const hashedPassword = await hash('userData.password', 10);
      const createUserData: User = await UserEntity.create({
        email: facebookUser.email,
        fullName: facebookUser.first_name + ' ' + facebookUser.last_name,
        password: hashedPassword,
        provider: 2,
      }).save();
      const tokenData = this.createToken(createUserData);
      const cookie = this.createCookie(tokenData);
      const token = tokenData.token;
      return { cookie, findUser: createUserData, token };
    } else {
      if (findUser.provider === 2) {
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        const token = tokenData.token;
        return { cookie, findUser, token };
      } else {
        throw new HttpException(409, 'Wrong Provider');
      }
    }
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default UserService;
