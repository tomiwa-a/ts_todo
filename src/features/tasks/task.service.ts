import { PoolClient } from "pg";
import TaskDTO from "./dto/task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";

import {
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from "../../shared/events/tasksEvents";
import TaskDAO from "./dao/task.dao";
import { eventBus } from "../../shared/infra/event-bus";

export enum TaskEventTypes {
  TaskCreated = "TaskCreated",
  TaskUpdated = "TaskUpdated",
}

class TaskService {
  private taskDAO;
  private db;

  constructor(db: PoolClient) {
    this.db = db;
    this.taskDAO = new TaskDAO(this.db);
  }

  async getAll(): Promise<TaskDTO[]> {
    let tasks = await this.taskDAO.getAll();
    return tasks;
  }

  async create(createTask: CreateTaskDTO): Promise<TaskDTO> {
    let task = await this.taskDAO.insert(createTask);

    const taskCreatedEvent: TaskCreatedEvent = {
      id: task.id,
      name: task.name,
      createdAt: task.createdAt!,
    };

    eventBus.emit(TaskEventTypes.TaskCreated, taskCreatedEvent);

    return task;
  }

  async update(task: TaskDTO): Promise<TaskDTO> {
    let updatedTask = await this.taskDAO.update(task);
    return updatedTask;
  }
}

export default TaskService;
