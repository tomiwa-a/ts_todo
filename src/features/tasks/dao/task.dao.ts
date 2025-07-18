import { PoolClient } from "pg";
import { CreateTaskDTO } from "../dto/create-task.dto";
import TaskDTO from "../dto/task.dto";

class TaskDAO {
  private db;

  constructor(db: PoolClient) {
    this.db = db;
  }

  async getAll(): Promise<TaskDTO[]> {
    try {
      let sql = "SELECT * FROM tasks ORDER BY id DESC";
      let result = await this.db.query(sql);

      if (result.rows.length == 0) {
        return [];
      }

      let tasks: TaskDTO[] = [];

      result.rows.forEach((rows) => {
        console.log(rows);
        tasks.push(new TaskDTO(rows.id, rows.name, rows.completed));
      });

      return tasks;
    } catch (e) {
      throw e;
    }
  }

  async insert(createTask: CreateTaskDTO): Promise<TaskDTO> {
    try {
      let sql = "INSERT INTO tasks (name) VALUES ($1) RETURNING *";

      let values: string[] = [createTask.name];
      let prepare = await this.db.query(sql, values);

      let task = prepare.rows[0];

      return new TaskDTO(task.id, task.name, task.completed);
    } catch (e) {
      throw e;
    }
  }

  async update(task: TaskDTO): Promise<TaskDTO> {
    try {
      //TODO : figure out an easier way to work with version here.
      let id = task.id;
      let sql =
        "UPDATE tasks SET name = $1, completed = $2, version = version + 1 WHERE id = $3 RETURNING *";
      let values = [task.name, task.completed, id];

      let prepared = await this.db.query(sql, values);
      if (prepared.rowCount == 0) {
        throw new Error("Could not be updated.");
      }

      task = prepared.rows[0];
      return new TaskDTO(task.id, task.name, task.completed);
    } catch (e) {
      throw e;
    }
  }
}

export default TaskDAO;
