import express, { Application } from 'express';
import { Server } from '@overnightjs/core';

import './paths/module-alias';
import * as database from './database';
import ProductsController from './controllers/products';
import UsersController from './controllers/users';
import IndexController from './controllers/index';

export default class SetupServer extends Server {
  constructor(private port = 3333) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const productsController = new ProductsController();
    const usersController = new UsersController();
    const indexController = new IndexController();
    this.addControllers([productsController, usersController, indexController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port:', this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
