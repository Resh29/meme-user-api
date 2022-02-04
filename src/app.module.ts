import { UserModule } from './userModule/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
const API_KEY =
  'mongodb+srv://memes-lord:29051992@cluster0.qx2yf.mongodb.net/meme-api?retryWrites=true&w=majority';
@Module({
  imports: [MongooseModule.forRoot(API_KEY), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
