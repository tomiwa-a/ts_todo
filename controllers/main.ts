import { NextFunction, Request, Response } from "express";
import { Client, PoolClient } from "pg";
import { NotFoundError } from "../utils/errors";

import TaskDAO from "../dao/TaskDAO";
import { Responses } from "../utils/responses";

class Main {
  private db;
  private taskDAO;

  constructor(db: PoolClient) {
    this.db = db;
    this.taskDAO = new TaskDAO(this.db);
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(this);
      let tasks = await this.taskDAO.getAll();

      Responses.success(res, "Tasks fetched successfully", tasks);
      return;
    } catch (e) {
      next(e);
    }
  };

  public getSingle = () => {};
}

export default Main;
