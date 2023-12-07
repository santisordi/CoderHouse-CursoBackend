import { Module } from '@nestjs/common';
import { PruebaController } from './prueba.controller';
import { PruebaService } from './prueba.service';

// Nest tiene siempre un modulo, un controlador y un servicio 
//comando consola: nest generate module // controller // service

@Module({
  controllers: [PruebaController],
  providers: [PruebaService]
})
export class PruebaModule {}
