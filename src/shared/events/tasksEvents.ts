export interface TaskCreatedEvent {
  id: number;
  name: string;
  createdAt: Date;
}

export interface TaskUpdatedEvent {
  id: number;
  name: string;
  completed: boolean;
  updatedAt: Date;
}

export interface TaskDeletedEvent {
  id: number;
  name: string;
}
