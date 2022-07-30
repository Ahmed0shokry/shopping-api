# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

# API Endpoints

### **Products**


| End Point	| Description | Method | token required | Parameters |Example |Request Body |
| --------- | ----------- | ------ | ------ |---------- | ------ | ----------- |
| Index | Index of all products | GET | no | none | yourDomainName/products |
| Show | Shows a single product by an id | GET | no | :id  | yourDomainName/products/1 |
| Create | Creates new a product |POST | yes |none  | yourDomainName/products |{"name": "product one","price": 200}      


### **Users**

| End Point | Description | Method | token required |Parameters |Example |Request Body |
|--------- | ----------- | ------ | ------|---------- | ------ | ----------- |
| Index     | Index of all users       				|GET | yes       |none                  |yourDomainName/users 		|
| Show      | Shows a user by id |GET | yes   |:id  |yourDomainName/users/1	    |
| Create    |Creates new user	|POST  | yes        |none                  |yourDomainName/users		    |{"firstname": "ahmed","lastname": "shokry","password": "your password"}
| Login    |Login a user	|POST      | no    |none                  |yourDomainName/users/login		    |{"firstname": "ahmed","lastname": "shokry","password": "your password"}

### **Orders**

| End Point	| Description | Method    | token required |Parameters	|Example    						|Request Body| query parameters
| --------- | ----------- | ---------- | ------ |----------| ------ | ----------- |-----------|
| Index     |index of all orders by user	|GET | yes       |none                   |yourDomainName/orders?user_id=1		        | |{"user_id" : 1}
| Show      |show one user's order include products |GET | yes       |:id                    |yourDomainName/orders/1	            | |
| Create    |Creates new order       				|POST | yes      |none                   |yourDomainName/orders		        |{"status": 1, "user_id" : 1} |

## Data Shapes
#### **product**

|Name |Type 
|:----|:----        
|id |integer |
|name |varchar | 
|price |numeric |

#### **users**

|Name            |Type |
| ---------------| ----|
|id              |integer 
|firstname       |varchar 
|lastname        |varchar 
|password        |varchar 

#### **orders**

|Name            |Type |
| ---------------| ----|
|id              |integer
|user_id         |integer
|status          |varchar

#### **order_product**

|Name            |Type |
|:---------------|:--- |
|id              |integer
|order_id        |integer
|product_id      |integer
|quantity        |integer

