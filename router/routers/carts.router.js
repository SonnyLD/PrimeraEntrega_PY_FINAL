import { Router } from "express";
import fs from 'fs';
const carts = []

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
   
  updateCarts(idProducto) {
    const carts = this.getProductById(this.getCarts);
    if (carts) {
      idProducto.title = this.title;
      
    } else{
      console.log("el producto no existe");
    }
   
  }
  
  deleteCarts(idProducto){
    const carts = this.getProductById(this.getCarts);
    if (carts) {
      idProducto.title = this.title;
     
    }else{
     console.log("title not found");
    }
  
  }
  
  }
  const cartsManager = new CartsManager();
  cartsManager.addCarts("Producto 1 Mesa de comedor", "mesa de madera");
  cartsManager.addCarts("Producto 2 Sofa de sala", "Producto de sala");
  cartsManager.addCarts("Producto 3 silla", "silla de cocina");

router.get('/', (req, res) => {
    res.json(cartsManager.getCarts)
})

router.post('/', (req, res) => {
    cartsManager.getCarts.push(req.body)
    res.status(201).json(carts);

})
router.put('/',(req, res) => {
    const carts = getCarts(req.params.productoId)

 if (!carts) return res.status(404).json({})

 carts.name = req.body.name
 res.json(carts)

})

router.delete('/', (req, res) => {
    const cartsDelete = getcartsDelete(req.params.productoId)

 if (cartsDelete === -1) return res.status(404).json({})

 carts.splice(cartsDelete, 1)
 res.json(carts)

});


export default router

