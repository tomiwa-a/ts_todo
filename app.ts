// src/app.ts
import express, { Application } from "express";
import MainRoutes from "./routes/mainRoutes";
import { errorHandler } from "./middlewares/errorHandler";

import pg, { Pool, PoolClient } from "pg";

import Database from "./config/db";
import Main from "./controllers/main";

class App {
  public app: Application;
  public db!: PoolClient;

  constructor() {
    this.app = express();
  }

  public async init() {
    this.db = await new Database().getClient();
    this.setMiddlewares();
    this.setRoutes(this.db);

    this.app.use(errorHandler);
  }

  private setMiddlewares(): void {
    this.app.use(express.json());
  }

  private setRoutes(db: PoolClient): void {
    this.app.use("/", new MainRoutes(this.db).getRouter());
  }
}

export default App;
