**Project Name:** EvaExchange

**Project Description:** EvaExchange is an arbitrarily trading game developed by a startup in a very short span of time called "Super Traders". The purpose of the application is to educate users on the terminology used in trading of shares.

##

**Users can do these functions:**

- Trade
  - Buy
  - Sell

##

#### Install & Configure Package

Execute the following command to install modules.

    npm install

In the next step, we need to create database tables. So, execute the following command to migrate the models.

    npx sequelize-cli db:migrate

We have successfully created the models. Now, we will initialize the tables via seeder.

    npx sequelize-cli db:seed:all

##

### Documentation

#### POST /api/trade/buy

You can buy share.

###### Headers

    Content-Type: application/json

###### Request Body (application/json) - example

    {
      "userId": 1,
    	"shareSymbol": "USD",
    	"quantity": 5
    }

> userId: required
> shareSymbol: required
> quantity: required

###### esponse (application/json) - example

    {
      "id": 11,
      "type": "BUY",
      "price": "28.41",
      "quantity": 5,
      "shareSymbol": "USD",
      "portfolioId": 1,
      "updatedAt": "2023-11-05T21:32:41.600Z",
      "createdAt": "2023-11-05T21:32:41.600Z"
    }

#### POST /api/trade/sell

You can sell share.

###### Headers

    Content-Type: application/json

###### Request Body (application/json) - example

    {
      "userId": 3,
      "shareSymbol": "GBP",
      "quantity": 2
    }

> userId: required
> shareSymbol: required
> quantity: required

###### Response (application/json) - example

    {
      "id": 12,
      "type": "SELL",
      "price": "35.13",
      "quantity": 2,
      "shareSymbol": "GBP",
      "portfolioId": 3,
      "updatedAt": "2023-11-05T21:59:07.947Z",
      "createdAt": "2023-11-05T21:59:07.947Z"
    }

#### Postman

Check out the collection on below link:
[https://www.postman.com/hasanbekir/workspace/evaexchange/collection/18509734-03b80051-550c-41ea-8f57-985ad8bc2a9e?action=share&creator=18509734](https://www.postman.com/hasanbekir/workspace/evaexchange/collection/18509734-03b80051-550c-41ea-8f57-985ad8bc2a9e?action=share&creator=18509734)

##

**Technologies that used in the project.**

- NodeJS
- Sequelize
- PostgreSQL
- REST API
