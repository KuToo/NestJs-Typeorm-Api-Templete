import { IsNotEmpty, IsString, Length, MaxLength, maxLength } from "class-validator";

export class signInDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20, { message: `用户名长度必须在$constrant1到$constrant2之间` })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: `密码长度必须在$constrant1到$constrant2之间` })
  password: string;
}