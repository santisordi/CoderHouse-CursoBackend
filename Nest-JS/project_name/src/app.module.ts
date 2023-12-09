import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FirstMiddleware } from './middlewares/FirstMiddleware';
import 'dotenv/config'

@Module({
  //se importa el modulo de atlas y se conecta la bdd
  //manejo de variables de entorno
  imports: [ 
    UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: async(config: ConfigService) => ({
        uri:config.get<string>('MONGODB_URI')
      })
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes({ path: '*',  method: RequestMethod.ALL})
  }
 }
