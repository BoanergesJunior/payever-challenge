<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) Repository destined for payever's technical challenge.

# Instructions
In this challenge it was asked to send email and publish a message with RabbitMQ.
The libaries used to build were nodemailer and amqplib.
To see the email arrive, create an account in https://mailtrap.io/ and set your username and password in the .env file

The project has an env-copy file, follow the steps putting your setting over.
Also has an docker-compose file, if you don't have RabbitMQ installed, make sure you have docker-compose or Docker Desktop installed to run the command

You can run the app and tests with yarn and npm

## Steps
Create the config file:
```bash
$ cp env-copy .env
```

If you don't have RabbitMQ at the root run:
```bash
$ docker-compose up
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
