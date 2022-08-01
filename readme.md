
## shop api

this is a nodejs api for making some online store operation like create order, product so on , I use here Expressjs, jwt and jasmine.

### for running it : 
1- to install all packages please run :
 
    -npm i
     
2- create two separated databases , one for testing and normal database.
       
3- create .env file:

    -i put an example.env file to know all keys I used.
    
    -to connect to database use these keys :
    
    POSTGRES_HOST=localhost //server host name
    POSTGRES_PORT=5432 // connection port
    POSTGRES_DB=shopping // your database name
    POSTGRES_DB_TEST=shopping_test // testing database name
    POSTGRES_USER=postgres //database username
    POSTGRES_PASSWORD=postgres // database password
    ENV=dev // to change between dev and test database
    
    PORT=3000 //connect with node on that port
   
    BCRYPT_PASSWORD=AHMED_SHOKRY_2022 // put that secret key for hashing
    SALT_ROUNDS=10 
    
    TOKEN_SECRET=AHMED_SHOKRY_SECRET // put your jwt secret key

3- to start the project, make sure you run node on port 3000 and postgresql on port 5432 then run :

    -npm run start


4- run -> db-migrate up

    - to migrate DB files

5- to add fake data to our project please  hit that link :

    - http://youServerName:3000/push-data 
     ex : http://localhost:3000/push-data

6- take a look to REQUIREMENTS.md to use my endpoints.

7- to generate a token you have to login or create user ,so to test you can log in for example : 

    -hit this link  (with POST method) : http://localhost:3000/users/login 
 
    -request body{ 
 
    firstname:Hossam
 
    lastname:Abubakr
 
    password:123456
 
    }
    
8- for testing, be sure first you change "ENV" key in .env to "test" , then  you pushed the fake data (step no. 5), last thing you run: 

    -npm run test     // it will run  -> npx tsc && jasmine
    
important note 

    -if you use post man to test, set Body to x-www-form-urlencoded in POST  request.