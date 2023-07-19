import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().valid("mysql", "postgres"),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get("DB_TYPE"),
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USER"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
          synchronize: configService.get("DB_SYNC"),
          logging: false,
        } as TypeOrmModuleAsyncOptions),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:{
          targets:[
            process.env.NODE_ENV !== "development"
              ? {
                  level: "info",
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                  }
                }
              : {
                  level: "error",
                  target: "pino-roll",
                  options: {
                    file:join('logs','log.log'),
                    frequency:'daily',
                    size:'10m',
                    mkdir:true
                  }
                },
          ]
        }
      },
    }),
    UserModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [CommonService],
})
export class AppModule {}
