# Dalil Coffee Project

This project is an e-commerce platform for Dalil Coffee store. It enables customers to browse and shop products from the store, place orders, and discover new products and offers. Additionally, it allows the store owners to manage customer orders and product inventory. The platform provides a simple dashboard for the owners to analyze store profits.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints In Postman](#api-endpoints-in-postman)
- [Notes](#notes)
## Requirements

To run this project, you will need:

- Node.js
- MongoDB

## Getting Started

### Prerequisites

Again, Make sure you have Node.js and MongoDB installed on your machine.

### Installation
1. Clone the repository:

```bash
git clone https://github.com/MohammadDAlil0/DCoffee
```
2. Install dependencies:
```bash
cd DCoffee
yarn install
```
3. Set up environment variables:

Create a config.env file in the root directory of the project and provide the following variables: 
```bash
DATABASE_LOCAL='mongodb://127.0.0.1:27017/coffeeDalil'
SERVER_PORT=4000

JWT_SECRET='your-jwt-secret';
JWT_EXPIRE_IN=5d

NODE_ENV='development'

TEAM_EMAIL='zeros@gmail.com'
TEAM_NAME=Dalil-coffee
```
4. Start the server:
```bash
yarn build
yarn start
```
The server should now be running on http://localhost:4000.

### API Endpoints In Postman
You can use and see the APIs using Postman using this link: https://documenter.getpostman.com/view/27420685/2sA3e2gVcJ

### Notes

- Changing The Environment: You can set NODE_ENV in your config.env file to be equal to development or to be equal to production. developer environment will connect to a local database, while the production environmet will connect to an online database(your cluster in mongodb).
