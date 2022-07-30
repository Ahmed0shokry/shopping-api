
## shop api

this is a nodejs api for making some online store operation like create order, product so on , I use here Expressjs, jwt and jasmine.

### for running it : 
1- npm i

2- npm run start

3- create .env file

    -i put an example.env file to know all keys I used.

4- run -> db-migrate up

    - to migrate DB files

5- hit link -> http://localhost:3000/push-data

    - to add fake data 

6- take a look to REQUIREMENTS.md to use my endpoints.

7- to generate a token you have to login or create user ,so to test you can log in for example : 

    -hit this link  (with POST method) : http://localhost:3000/users/login 
 
    -request body{ 
 
    firstname:Hossam
 
    lastname:Abubakr
 
    password:123456
 
    }
important note 

    -if you use post man to test, set Body to x-www-form-urlencoded in POST  request.