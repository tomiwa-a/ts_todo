import EventEmitter from "events";
import { TaskEventTypes } from "../../features/tasks/task.service";

export class EventBusListener {
  constructor(eventBus: EventEmitter) {
    eventBus.on(TaskEventTypes.TaskCreated, (event) => {
      //   console.log(event);
    });
  }
}
