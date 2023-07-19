import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,private jwt:JwtService){}
  
  async signIn(username:string,password:string){
    //查询用户
    const user = await this.userService.findUserByUsername(username);
    if(!user) throw new ForbiddenException('用户不存在');
  
    //密码校验
    const passwordVerfy = await this.userService.verifyPassword(user, password);
    if(!passwordVerfy) throw new ForbiddenException('用户名或密码错误');

    //响应
    return await this.jwt.signAsync({
      username: user.username,
      sub:user.id
    })
  }
}
