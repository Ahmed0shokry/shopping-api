
## image processing API

this is a nodejs api for making some image processing such as resize image and so on , i use here expressjs and jasmine.

### for run it : 
1- npm i

2- npm run lint
 - to make sure everything is good

3- npm run start

 4- we have 3 images name : [ cat, rabbit, caw]... use any name of them as "name" parameters with "width" and "hieght"

5- our endpoint is http://localhost:3000/api/image/resize

 6- example: 

 http://localhost:3000/api/image/resize?name=cat&width=450&hieght=300

 7- npm run test 