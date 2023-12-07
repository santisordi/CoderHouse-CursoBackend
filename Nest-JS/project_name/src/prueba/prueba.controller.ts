import { Controller, Get } from '@nestjs/common';
import { PruebaService } from './prueba.service';

@Controller('prueba')
export class PruebaController {
    constructor (private readonly servicio: PruebaService) { }

        @Get()
        obtenerInfo(): string{
            return this.servicio.obtenerDatos();
        }

}
