## Knex commands

## Install CLI

`npm install knex -g`

### To create db tables

- `knex migrate:latest`
  If you get errors related to ER_NOT_SUPPORTED_AUTH_MODE

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
```

### To seed data:

- `knex seed:run`

### Alternatively you can have all your scripts inside of your package.json file:

```JSON
"scripts": {
    "migrate": "knex migrate:latest",
    "migrate:down": "knex migrate:down",
    "migrate:rollback": "knex migrate:rollback",
    "seed": "knex seed:run"
  }
```
