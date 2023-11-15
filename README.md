## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Introduction

- Bookmyshow

## Installation

```bash
npm install
```

### Postgres Database

1. Add the .env variables from the .env.example file

2. enerate tables and database using SQL. This command will generate all the SQL commands from `schema.prisma`

```bash
npm run prisma:generate
```

3. Resets the data inside the database and runs the seed file to generate mock data in the tables

```bash
npm run prisma:migrate-reset
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Prisma

(Run only after making changes in the `schema.prisma` file)

```bash
# initialize prisma client
$ yarn prisma:generate

# create and run the migrations on the database
$ yarn prisma:migrate-dev -- --name <migration-name>

# reset the database. This will clear all the data & run the seed files adding mock data in the database
$ yarn run prisma:migrate-reset
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
