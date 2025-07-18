import { NextFunction, Request, Response } from "express";
import { Client, PoolClient } from "pg";
import { CreateTaskDTO } from "./dto/create-task.dto";
import TaskService from "./task.service";
import { Responses } from "../../shared/utils/responses";

class TaskController {
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

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { name } = req.body;

      if (!name) {
        throw new Error("Name is required");
      }

      let createTask = new CreateTaskDTO(name);
      let task = await this.taskService.create(createTask);
      Responses.success(res, "Task created successfully", task);
      return;
    } catch (e) {
      next(e);
    }
  };

  public update = () => {};
}

export default TaskController;
