import { Router } from "express";
import fs from 'fs';
import { title } from "process";


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
   
  updateProduct(title, data) {
    for(let products of this.getProducts){
     if(products.title === title){
      products = Object.assign(products, data);
      fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
      return products;
     }  
    } 
  }
  
  
  deleteProduct(id, data){
    for(let products of this.getProducts){
      if(products.id === id){
       products = Object.assign(products, data);
       fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
       return products;
      }  
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
    res.status(201).json(productManager.getProducts);

})

router.put('/:title',(req, res) => {
  try {
    const { title } = req.params;
    const { body } = req;
    const newProduct = productManager.updateProduct(title, body);
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', (req, res) => {
  let products = productManager.deleteProduct(item => item.id === req.query.id);
 productManager.deleteProduct(products, 1);
 res.sendStatus(200);
});

export default router