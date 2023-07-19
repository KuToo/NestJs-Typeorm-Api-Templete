import { Repository } from "typeorm";
import { User } from "./user.entity";
import bcrypt from "bcrypt";

export class UserRepository extends Repository<User> {
  
  createUser(username: string, password: string){

  }

  async hashPassword(password:string): Promise<string>{
    return await bcrypt.hash(password);
  }

  async comparePassword(password:string,hashPassword:string): Promise<boolean>{
    return await bcrypt.compare(password, hashPassword);
  }

}