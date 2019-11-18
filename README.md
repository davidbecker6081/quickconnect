## Installation Steps
1. Download PostgresQL
2. Open PostgresQL
3. Create new local database
  - `psql`
  - `CREATE DATABASE quickconnect;`
  - `\q`
4. Create new local database
  - `psql`
  - `CREATE DATABASE quickconnect_test;`
  - `\q`
5. Start local database server


## Available Commands
1. `knex migrate:make initial`
2. `knex migrate:latest`
3. `knex migrate:latest --env test`
4. `knex seed:make {name}`
5. `knex seed:run`

## Available Scripts


## Tables Available
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
