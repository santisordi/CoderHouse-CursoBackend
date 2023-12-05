//Declaracion de tipos en las variables

let numero: number = 5;
let numeroStraing: number | string = 5;  
let mensaje: string = "Hola!";
let isTrue: boolean = true;

// funciones = estas adontan el tipo de dato que se declara en los parametros

const sumar = (num1: number, num2: number) =>{
    return num1 + num2
};

console.log(sumar(5,5));

//clases

class Animal {
    constructor(public nombre: string){

    }
    
    moverse (velocidad: number): void {
        console.log(`me muevo a ${velocidad}`)
    }
};

const gatito: Animal = new Animal ("Pepito");

//atributos pivados getter o setters
