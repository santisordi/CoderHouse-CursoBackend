import {promises as fs} from 'fs'

export class ProductManager{
    constructor(path) {
        this.products = [],
        this.path = path
    }

    static incrementarID() {
		this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);
		return this.idIncrement;
	}

    async getProducts(){

        const prods = JSON.parse(await fs.readFile(this.path,'utf-8'));
        
        return prods;
    
    }

    async addProduct(prod){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const existProd = prods.find(producto => producto.code === prod.code);

        return existProd
            ? false
            : (prod.id = ProductManager.incrementarID(),
            prods.push(producto),
            await fs.writeFile(this.path, JSON.stringify(prods)),
            true);
        

    }
} 