import { NextFunction, Request, Response } from "express";
import { Client, PoolClient } from "pg";
import TaskService from "../services/taskService";
import { NotFoundError } from "../utils/errors";

import { Responses } from "../utils/responses";

class Main {
  private db;
  private taskService;

  constructor(db: PoolClient) {
    this.db = db;
    this.taskService = new TaskService(db);
  }

  //TODO: modify this, move code to services so it's more centralized.
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let tasks = await this.taskService.getAll();
      Responses.success(res, "Tasks fetched successfully", tasks);
      return;
    } catch (e) {
      next(e);
    }
  };

  public getSingle = () => {};

  public create = () => {};

  public update = () => {};
}

export default Main;
