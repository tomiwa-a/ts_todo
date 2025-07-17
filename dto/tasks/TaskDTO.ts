class TaskDTO {
  constructor(
    public id: number,
    public name: string,
    public completed: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

export default TaskDTO;
