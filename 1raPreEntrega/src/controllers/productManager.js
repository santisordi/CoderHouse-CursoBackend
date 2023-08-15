import { promises as fs } from 'fs';

export class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}
	
	static incrementarID() {
		this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);
		return this.idIncrement;
	}

	async addProduct(product) {
		try {
      this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      const { title, description, price, thumbnail, code, stock } = product;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log(
          'El producto debe incluir los campos title, description, price, thumbnail, code y stock'
        );
        return;
      }

      if (this.products.find(element => element.code == product.code)) {
        console.log('El código del producto ya existe');
      } else {
        this.products.push(product);
        let writeProducts = JSON.stringify(this.products);
        await fs.writeFile(this.path, writeProducts);
      }
    } catch (error) {
      console.error('Error in addProduct:', error);
    }
  }

  async getProducts() {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      return this.products;
    } catch (error) {
      console.error('Error in getProducts:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      const product = this.products.find(product => product.id == id);
      if (product) {
        return product;
      } else {
        console.log('Product not found');
        return null;
      }
    } catch (error) {
      console.error('Error in getProductById:', error);
      return null;
    }
  }

  async updateProduct(id, update) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      let product = this.products.find(prod => prod.id == id);
      if (product) {
        let keys = Object.keys(update);
        keys.forEach(key => key !== 'id' && (product[key] = update[key]));
        let writeProducts = JSON.stringify(this.products);
        await fs.writeFile(this.path, writeProducts);
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.error('Error in updateProduct:', error);
    }
  }

  async deleteProduct(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      this.products = this.products.filter(prod => prod.id !== id);
      let writeProducts = JSON.stringify(this.products);
      await fs.writeFile(this.path, writeProducts);
    } catch (error) {
      console.error('Error in deleteProduct:', error);
    }
  }
}

// class Product {
// 	constructor({ title, description, price, thumbnail, code, stock }) {
// 		this.title = title;
// 		this.description = description;
// 		this.price = price;
// 		this.thumbnail = thumbnail;
// 		this.code = code;
// 		this.stock = stock;
// 		this.id = Product.incrementarID();
// 	}

// }