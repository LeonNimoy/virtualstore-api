import express, { Application } from 'express';
// import * as dotenv from 'dotenv';
import { Server } from '@overnightjs/core';

import './paths/module-alias';
import 'dotenv';
import ProductsController from './controllers/products';

// dotenv.config();

// app.use(express.json());

export default class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const productsController = new ProductsController();
    this.addControllers([productsController]);
  }

  public getApp(): Application {
    return this.app;
  }
}

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log('Server Started');
// });
