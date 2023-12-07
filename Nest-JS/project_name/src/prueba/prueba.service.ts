import { Injectable } from '@nestjs/common';

@Injectable()
export class PruebaService {
    obtenerDatos(): string{
        return 'Datos privados de la empresa'
    }

}
