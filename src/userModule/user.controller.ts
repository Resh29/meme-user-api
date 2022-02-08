import { UserLoginDto } from './user/user-login.dto';
import { UserDto } from './user/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http2';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/meme-api')
  getUserData(): string {
    return this.userService.getUserDataObject();
  }
  @Post('/meme-api/registration')
  async registration(@Body() userDto: UserDto): Promise<any> {
    return await this.userService.createNewUser(userDto);
  }
  @Get('/meme-api/login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<any> {
    const token = headers.authorization.replace('Bearer ', '');
    return this.userService.login(userLoginDto, token);
  }
}
