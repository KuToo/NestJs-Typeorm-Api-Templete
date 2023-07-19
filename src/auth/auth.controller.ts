import { Body, Controller, Post } from '@nestjs/common';
import { signInDto } from './dtos/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  
  @Post('signin')
  async signIn(@Body() dto: signInDto){
    const { username ,password} = dto;
    const token = await this.authService.signIn(username, password);
    return {
      token
    }
  }
}
