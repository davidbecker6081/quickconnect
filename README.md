# Quick Connect
Quick Connect is a simple, public chat API that allows users to send and receive messages. Built for Guild Education's code challenge. You can check out a live version here: https://quick-connect-db.herokuapp.com/

## Setup
##### Clone repo
  - ```git clone```

##### NPM install
  - ```npm install```

##### Make .env
  - Make file at root level
  - Add in:
    ```
    API_VERSION=v1
    PORT=8080
    NODE_ENV=development
    NODE_ENV_TEST=test
    ```

##### Create a quick connect database using PostgresQL
  - ```psql```
  - ```CREATE DATABASE quickconnect;```

##### Create a quick connect test database using PostgresQL
  - ```psql```
  - ```CREATE DATABASE quickconnect_test;```

##### Migrate table schema using knex
  - ```npm run migrate```

##### Seed databases
  - ```npm run seed:dev```
  - ```npm run seed:test```
  - If this doesn't work, please `cd` into `lib` directory, and then run `knex seed:run` and `knex seed:run --env test`-

##### Run tests
  - ```npm run test```

##### Build/Start server
  - ```npm run start```
  - Server at: http://localhost:8080


-------------------------

## Table Available From Knex Migration
| **Messages**        |
| :------------------:|
| id                  |
| message             |
| sender_id           |
| recipient_id        |
| created_at          |

#### Available Endpoints
API_VERSION_PREFIX: `v1`

- **[`GET` messages/:recipient_id](https://github.com/davidbecker6081/quickconnect/blob/master/endpoint_documentation/GET_allMessages.md)**
- **[`GET` messages/:recipient_id/:sender_id](https://github.com/davidbecker6081/quickconnect/blob/master/endpoint_documentation/GET_messages.md)**
- **[`POST` /messages](https://github.com/davidbecker6081/quickconnect/blob/master/endpoint_documentation/POST_message.md)**


#### Design/Additional Considerations
- **[Design and Additional Considerations](https://github.com/davidbecker6081/quickconnect/blob/master/Notes.md)**
