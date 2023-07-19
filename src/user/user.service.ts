import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findUserById(userId:number):Promise<User> {
    return this.userRepository.findOne({where:{id:userId}});
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  encodePassword(password: string): Promise<string> {
    return this.userRepository.hashPassword(password);
  }

  verifyPassword(user:User,password:string): Promise<boolean> {
    return this.userRepository.comparePassword(user.password,password);
  }
}
