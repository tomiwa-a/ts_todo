import express, { Router } from "express";

import Main from "../controllers/main";
import { PoolClient } from "pg";

class MainRoutes {
  private db;

  private router;

  private main;

  constructor(db: PoolClient) {
    this.db = db;

    this.router = express.Router();

    this.main = new Main(this.db);

    this.router.get("/", this.main.getAll);
  }

  getRouter() {
    return this.router;
  }
}

export default MainRoutes;
