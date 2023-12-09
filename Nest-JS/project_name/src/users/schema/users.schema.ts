import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose"; //decorador de props y se agragas a todas las propiedes de las clases
//Schemafactory permite generar objetos a traves de una clase (en este caso, la clase user)
// La clase User es un Schema
import { HydratedDocument } from "mongoose";
//UserDocument lo llamo para poder instansiar una clase
export type UserDocument = HydratedDocument<User> //HydratedDocument se utiliza para agarrar una clase imple y agregarle nuevas funcionalidades

//se utiliza para poder implementar lo referido al tipado de los dato
@Schema()
export class User {
    @Prop({required: true})
    first_name: string
    @Prop({required: true})
    last_name: string
    @Prop({required: true})
    email: string
} ;

export const userSchema = SchemaFactory.createForClass(User)