import { UserLoginDto } from './user/user-login.dto';
import { UserDto } from './user/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.userService.login(userLoginDto);
  }
}
