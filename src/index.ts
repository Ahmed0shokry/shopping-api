import express, { Request, Response } from 'express'
import morgan from 'morgan'
import * as env from 'dotenv'
import db from './database'
import * as queries from './data'
import productsRoutes from './handlers/Product'
import usersRoutes from './handlers/User'
import ordersRoutes from './handlers/Order'

function getPort() {
  env.config()
  return process.env.PORT || 3030
}


const PORT = getPort()
const app = express()

//use libs
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'welcome to our shopping api project ^_^' })
})

productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

app.get('/push-data',  (req: Request, res: Response)=>{
  insertUsers();
  return res.json('done pushing data');
});

function insertUsers():void {
  db.connect().then((client) => {
     client.query(queries.insertUsers()).then((res) => {
      client.release()
         insertOrders()
         return;
     })
  })
}


function insertProducts(): void{
  db.connect().then((client) => {
     client.query(queries.insertProducts()).then((res) => {
      client.release()
      insertProductsInOrders();
         return;
    })
  })
}


function insertOrders(): void{
  db.connect().then((client) => {
     client.query(queries.insertOrders()).then((res) => {
         insertProducts()
         client.release()
         return;
    })
  })
}


function insertProductsInOrders(): void{
  db.connect().then((client) => {
     client.query(queries.insertProductsInOrders()).then((res) => {
      client.release()
         return;
    })
  })

}


app.listen(PORT, () => {
  console.log('welcome to our app entry point')
})
export default app
