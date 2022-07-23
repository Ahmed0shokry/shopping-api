import express, { Request, Response } from 'express'
import morgan from 'morgan'
import * as env from 'dotenv'
import db from './database'
import * as queries from './data'

function getPort() {
  env.config()
  return process.env.PORT || 3030
}


const PORT = getPort()
const app = express()

//use libs
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'welcome to our shopping api project ^_^' })
})

app.get('/push-data',  (req: Request, res: Response)=>{
  insertUsers();
});

function insertUsers():void {
  db.connect().then((client) => {
     client.query(queries.insertUsers()).then((res) => {
      client.release()
       insertProducts()
    })
  })
}


function insertProducts(): void{
  db.connect().then((client) => {
     client.query(queries.insertProducts()).then((res) => {
      client.release()
       insertOrders()
    })
  })
}


function insertOrders(): void{
  db.connect().then((client) => {
     client.query(queries.insertOrders()).then((res) => {
      client.release()
       insertProductsInOrders();
    })
  })
}


function insertProductsInOrders(): void{
  db.connect().then((client) => {
     client.query(queries.insertProductsInOrders()).then((res) => {
      client.release()
    })
  })
}


app.listen(PORT, () => {
  console.log('welcome to our app entry point')
})
export default app
