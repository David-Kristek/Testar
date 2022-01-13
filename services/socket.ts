import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Socket } from "socket.io-client";
import * as TaskActions from "../redux/slicers/task";

export default class SocketService {
  static socket: Socket;
  dispatch: ThunkDispatch<any, any, AnyAction>;

  constructor(socket: Socket, dispatch: ThunkDispatch<any, any, AnyAction>) {
    SocketService.socket = socket;
    this.dispatch = dispatch;
  }
  setSocketsListeners() {
    SocketService.socket.on("TASK_ADDED", (task: Task) => {
      console.log(task, " task added sent by", task.createdByUser.username);

      this.dispatch(
        TaskActions.addTask({ index: task, options: { socket: true } })
      );
    });
    SocketService.socket.on("TASK_DELETED", (taskId: string) => {
      console.log(taskId, " task deleted sent");
      this.dispatch(
        TaskActions.deleteTask({ index: taskId, options: { socket: true } })
      );
    });
  }
  public static addTask(task: Task) {
    SocketService.socket.emit("ADD_TASK", task);
  }
  public static deleteTask(taskId: string) {
    SocketService.socket.emit("DELETE_TASK", taskId);
  }
}
