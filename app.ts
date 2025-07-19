// src/app.ts
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandler";

import pg, { Pool, PoolClient } from "pg";

import Database from "./config/db";
import TaskRoutes from "./src/features/tasks/task.routes";
import { EventBusListener } from "./src/shared/infra/event-bus-listener";
import { eventBus } from "./src/shared/infra/event-bus";
import KafkaModule from "./src/shared/infra/kafka.module";

class App {
  public app: Application;
  public db!: PoolClient;

  constructor() {
    this.app = express();
  }

  public async init() {
    this.db = await new Database().getClient();
    this.setupEventListeners();
    this.setMiddlewares();
    this.setRoutes(this.db);

    await new KafkaModule().sendMessage("hello", "world");

    await new KafkaModule().getMessage("hello");

    this.app.use(errorHandler);
  }

  private setMiddlewares(): void {
    this.app.use(express.json());
  }

  private setRoutes(db: PoolClient): void {
    this.app.use("/", new TaskRoutes(this.db).getRouter());
  }

  private setupEventListeners() {
    new EventBusListener(eventBus);
  }
}

export default App;
