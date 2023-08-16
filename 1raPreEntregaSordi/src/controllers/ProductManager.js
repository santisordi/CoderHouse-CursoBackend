import { promises as fs} from 'fs';
import {nanoid} from 'nanoid';

class ProductManager{
    constructor (){
        this.path = "src/models/products.json";
    }

    readProducts = async ()=>{
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products);
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));

    }

    addProducts = async (product)=>{
        let productsOld = await this.readProducts();
        product.id = nanoid();
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto agregado correctamente";

    }

    getProducts = async ()=>{
        return await this.readProducts();
    }

    getProductsById = async (id)=>{
        let products=  await this.readProducts();
        let productById = products.find(prod => prod.id === id);
        return productById;
    }

}

export default ProductManager;