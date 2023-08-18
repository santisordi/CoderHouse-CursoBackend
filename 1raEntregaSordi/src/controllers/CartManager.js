import { promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll = new ProductManager; //con esto podemos usar todos los metodos del PM


class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
    }
    
    readCarts = async ()=>{  // metodo lectura de los archivos
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts);
    };
    writeCarts = async (carts) => { //metodo para escribir 
        await fs.writeFile(this.path, JSON.stringify(carts));
    
    };

    exist = async (id) => {
        let carts=  await this.readCarts();
        return carts.find(cart => cart.id === id);
    };

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid();
        let cartsConcat = [{id : id, products : []}, ...cartsOld];
        await this.writeCarts(cartsConcat);
        return "Carrito Agregado";

    };

    getCartsById = async (id)=>{
        let cartsById = await this.exist(id);
        if (!cartsById) return "Carrito no encontrado";
        return cartsById;
    };

    addProductInCart = async (cartId, productId)=>{
        let cartsById = await this.exist(cartId);
        if (!cartsById) return "Carrito no encontrado";
        let productById = await productAll.exist(productId);
        if (!productById) return "Producto no encontrado";
        
        let cartsAll = await this.readCarts();
        let carFilter = cartsAll.filter(prod => prod.id != productId);

        if(cartId.products.some( prod => prod.id === productId)){
            let productInCart = cartId.products.find(prod => prod.id === productId);
            productInCart.cantidad++;
            let cartConcat = [productInCart, ...carFilter]
            await this.writeCarts(cartConcat);
            return "Producto sumado al carrito";

        };
        let cartConcat = [{id:cartId, products: [{id:productById.id, cantidad: 1}]}, ...carFilter];

        return "Producto agregado al carrito";
    };

};

export default CartManager;
