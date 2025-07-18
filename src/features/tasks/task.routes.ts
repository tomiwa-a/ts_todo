import express, { Router } from "express";

import { PoolClient } from "pg";
import TaskController from "./task.controller";

class TaskRoutes {
  private db;

  private router;

  private main;

  constructor(db: PoolClient) {
    this.db = db;

    this.router = express.Router();

    this.main = new TaskController(this.db);

    this.router.get("/", this.main.getAll);
    this.router.post("/", this.main.create);
  }

  getRouter() {
    return this.router;
  }
}

export default TaskRoutes;
