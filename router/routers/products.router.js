import { Router } from "express";
import fs from 'fs';
const products = []

const router = Router();

class ProductManager {
    constructor() {
        this.getProducts = [];
    }
    async addProducts(title, description, price, thumbnail, stock) {
      try{
       const products ={
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code: [],
        stock,
    };
    this.getProducts.push(products);
    if(fs.existsSync('getProducts.json')){
      const getProducts = JSON.parse(await fs.promises.readFile('getProducts.json','utf8'));
      this.getProducts = getProducts;
      this.getProducts.push(products);
    } else{
      this.getProducts.push(products);
      fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts))
    }
  
    }catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } 
  getProductById(idProducto) { 
    const products = this.#getProducts(idProducto);
    if (products) {
      if (!products.includes(idProducto)) products.push(idProducto);
      console.log(this.getProducts);
    } else {  
       console.log("El producto existe");
    }
  }
  #getMaxId() {
    let maxId = 0;
    this.getProducts.map((products) => {
      if (products.id > maxId) maxId = products.id
    });
    return maxId;
  }
  #getProducts(idProducto) {
    return this.getProducts.find((products) => products.id === idProducto);
  }
   
  updateProduct(idProducto) {
    const products = this.getProductById(this.getProducts);
    if (products) {
      idProducto.title = this.title;
      idProducto.description = this.description;
    } else{
      console.log("el producto no existe");
    }
   
  }
  
  deleteProduct(idProducto){
    const products = this.getProductById(this.getProducts);
    if (products) {
      idProducto.title = this.title;
     
    }else{
     console.log("title not found");
    }
  
  }
  
  }
  const productManager = new ProductManager();
  productManager.addProducts("Producto 1 Mesa de comedor", "mesa de madera", 1400, "Sin imagen", 60);
  productManager.addProducts("Producto 2 Sofa de sala", "Producto de sala", 1000, "Sin imagen", 100);
  productManager.addProducts("Producto 3 silla", "silla de cocina", 230, "Sin imagen", 200);

router.get('/', (req, res) => {
    res.json(productManager.getProducts)
})

router.post('/', (req, res) => {
    productManager.getProducts.push(req.body)
    res.status(201).json(products);

})

router.put('/',(req, res) => {
    const products = getProducts(req.params.productoId)

 if (!products) return res.status(404).json({})

 products.name = req.body.name
 res.json(products)

})

router.delete('/', (req, res) => {
    const productsDelete = getproductsDelete(req.params.productoId)

 if (productsDelete === -1) return res.status(404).json({})

 products.splice(productsDelete, 1)
 res.json(products)

});

export default router