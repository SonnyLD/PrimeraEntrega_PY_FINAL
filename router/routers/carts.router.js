import { Router } from "express";
import fs from 'fs';

const router = Router()

class CartsManager {
    constructor() {
        this.getCarts = [];
    }
    async addCarts(title) {
      try{
       const carts ={
        id: this.#getMaxId() + 1,
        title,
        
    };
    this.getCarts.push(carts);
    if(fs.existsSync('getCarts.json')){
      const getCarts = JSON.parse(await fs.promises.readFile('getCarts.json','utf8'));
      this.getCarts = getCarts;
      this.getCarts.push(carts);
    } else{
      this.getCarts.push(carts);
      fs.promises.writeFile('getCarts.json',JSON.stringify(this.getCarts))
    }
  
    }catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } 
  getProductById(idProducto) { 
    const carts = this.#getCarts(idProducto);
    if (carts) {
      if (!carts.includes(idProducto)) carts.push(idProducto);
      console.log(this.getCarts);
    } else {  
       console.log("El producto existe");
    }
  }
  #getMaxId() {
    let maxId = 0;
    this.getCarts.map((carts) => {
      if (carts.id > maxId) maxId = carts.id
    });
    
    return maxId;
    
  }
  #getCarts(idProducto) {
    return this.getCarts.find((carts) => carts.id === idProducto);
  }
   
  }
  const cartsManager = new CartsManager();
  cartsManager.addCarts("Producto 1 Mesa de comedor", "mesa de madera");
  cartsManager.addCarts("Producto 2 Sofa de sala", "Producto de sala");
  cartsManager.addCarts("Producto 3 silla", "silla de cocina");

router.get('/:cid', (req, res) => {
    res.json(cartsManager.getCarts)
})

router.post('/cid/product/:pid', (req, res) => {
    cartsManager.getCarts.push(req.body)
    res.status(201).json(cartsManager.getCarts);

})

export default router

