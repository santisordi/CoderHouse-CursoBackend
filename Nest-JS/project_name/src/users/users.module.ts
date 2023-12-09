import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/users.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([ //importo los modelos que vamos a utilizar en la app
      {
        name: User.name,
        schema: userSchema
      }
    ])  
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
