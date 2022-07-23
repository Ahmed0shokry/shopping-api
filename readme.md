
## shop api

this is a nodejs api for making some online store operation like create order, product so on , I use here Expressjs, jwt and jasmine.

### for running it : 
1- npm i

2- npm run start

3- create .env file with these keys : 

PORT=3000

POSTGRES_HOST=

POSTGRES_PORT=

POSTGRES_DB=

POSTGRES_DB_TEST=

POSTGRES_USER=

POSTGRES_PASSWORD=

ex: 

PORT=3000

POSTGRES_HOST=localhost

POSTGRES_PORT=5432

POSTGRES_DB=shopping

POSTGRES_DB_TEST=shopping_test

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres 

4- run -> db-migrate up
- to migrate DB files

5- hit -> http://localhost:3000/push-data
 - to add fake data 

6- still working on it