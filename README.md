# Listok!

Listok is small ReactJS based App that can save a library of your own recipe's, allow you to choose your meals for the week and generate a shopping list for you!

## Requires:

1. NodeJS, you can get it here: `https://nodejs.org/en`
2. Docker Desktop (or alternative such as Rancher): `https://www.docker.com/products/docker-desktop/`

## Getting Started:

1. Run `npm install` to install packages!

2. Configureyour `.env` file:
    <br> -> Create a file called '.env' in the root of the project.

    <br> -> Inside you'll need the following variables:

### Example .env:
    //Port that local host with run on
    PORT=3001 

    //Your google console client id
    GOOGLE_OAUTH_CLIENT_ID= 

    //Your google console client secret
    GOOGLE_OAUTH_CLIENT_SECRET= 

    //localhost ip address
    DB_HOST=127.0.0.1 

    //database port
    DB_PORT=3306 

    // database password
    MYSQL_ROOT_PASSWORD=test 

    //database name
    MYSQL_DATABASE=listokdb 

    //A random JWT secret, link can explain how to generate one
    JWT_SECRET= https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4 

3. Start Database: 
    <br> -> Run `docker compose up` in the terminal to start the server

4. Run Listok!:
    <br> -> In a seperate terminal run `npm start` in the terminal! It should be running at http://localhost:`process.env.PORT`
    <br> -> If successful you should see the following in the terminal `[server]: Server is running at http://localhost:PORT` followed by a successful webpack compile
    <br> -> either clock the link in the terminal or go to http://localhost:PORT
