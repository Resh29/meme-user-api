import { UserLoginDto } from './user/user-login.dto';
import { UserDto } from './user/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Headers, Post, Param, Delete } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http2';
import {MemeObject} from './user-schemas/user.schema'
@Controller('/meme-api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUserData(): string {
    return this.userService.getUserDataObject();
  }
  @Post('/registration')
  async registration(@Body() userDto: UserDto): Promise<any> {
    console.log(userDto);
    return await this.userService.createNewUser(userDto);
  }
  @Post('/login')
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<any> { 
    console.log(userLoginDto)
     return this.userService.login(userLoginDto);
  }
  @Post('/auth') 
  async getUserByToken(@Headers() headers: IncomingHttpHeaders): Promise<any> {
      const token = headers.authorization.replace('Bearer ', '');
    return this.userService.authByToken(token);
  }
  @Post('/save/:id')
  async saveMemes(@Param() {id}, @Body() meme: MemeObject) {
      return this.userService.saveMemesToCollection(id, meme);
  }
  @Delete('/delete/:id')
  async deleteMeme(@Param() {id}, @Body() meme: MemeObject) {
    return this.userService.removeMemeFromCollection(id, meme.id);
  }
  @Get('/memes-collection/:id')
  async getMemesCollectionByUserId(@Param() {id}): Promise<any> {
    return this.userService.getMemesCollection(id);
  }
}
