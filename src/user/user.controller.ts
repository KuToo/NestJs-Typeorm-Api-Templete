import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {}
