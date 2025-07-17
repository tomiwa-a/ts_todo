import { PoolClient } from "pg";
import TaskDTO from "../dto/tasks/TaskDTO";

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
        tasks.push(
          new TaskDTO(
            rows.id,
            rows.name,
            rows.completed,
            rows.created_at,
            rows.updated_at
          )
        );
      });

      return tasks;
    } catch (e) {
      throw e;
    }
  }
}

export default TaskDAO;
