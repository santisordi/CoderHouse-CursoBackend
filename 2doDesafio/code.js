import { promises as fs } from 'fs';

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.path = filePath;
    }

    async init() {
        try {
        const data = await fs.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        } catch (error) {
        // devuelve array vacio si no existe
        this.products = [];
        }
    }

    async save() {
        try {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
        console.error('Error saving products:', error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        return product ? product : "Not Found";
    }

    addProduct(product) {
        product.id = Product.incrementarID();
        this.products.push(product);
        this.save();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(prod => prod.id === id);
        if (index !== -1) {
        this.products[index] = { ...updatedProduct, id };
        this.save();
        } else {
        console.log("Product not found");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(prod => prod.id === id);
        if (index !== -1) {
        this.products.splice(index, 1);
        this.save();
        } else {
        console.log("Product not found");
        }
    }
    }

    class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    static incrementarID() {
        if (!Product.idIncrement) {
        Product.idIncrement = 1;
        } else {
        Product.idIncrement++;
        }
        return Product.idIncrement;
    }
    }

    const productManager = new ProductManager('./productos.txt');

    async function main() {
    await productManager.init();

    const product1 = new Product("Arroz", "Rico", 1000, "", "123", 20);
    const product2 = new Product("Arroz", "Rico", 1000, "", "456", 20);

    productManager.addProduct(product1);
    productManager.addProduct(product2);

    console.log(productManager.getProducts());
    console.log(productManager.getProductById(2));

    // actualizacion de un producto
    const updatedProduct = { ...product1, title: "Updated Arroz" };
    productManager.updateProduct(product1.id, updatedProduct);
    console.log(productManager.getProducts());

    //borrado de producto
    productManager.deleteProduct(product2.id);
    console.log(productManager.getProducts());
}

main();