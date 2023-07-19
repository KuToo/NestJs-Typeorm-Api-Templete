import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:configService.get('JWT_TTL')
          }
        }
      },
      inject:[ConfigService]
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
