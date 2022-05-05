import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { SelectTaskStoreData } from "../ports/in/select-task-store-data";
import { ChannelUserTask } from "../ports/out/channel-user-task";
import { ExecuteCommand } from "../commands/execute-command";
import { ChannelTaskStoreData } from "../ports/out/channel-task-store-data";
import { ChannelResultChangeTasks } from "../ports/out/channel-result-change-tasks";
import { Task } from "../types/task";
import { ErrorExecutingTaskDto } from "../dto/error-executing-task-dto";

export class ExecuteUseCase {
  constructor(
    private readonly _channelUserTask: ChannelUserTask,
    private readonly _selectTaskStoreData: SelectTaskStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelTaskStoreData: ChannelTaskStoreData,
    private readonly _channelResultChangeTasks: ChannelResultChangeTasks
  ){}

  execute(command: ExecuteCommand) {
    this._selectStoreTokenData.select().then(tokens => {
      const foundToken = tokens.find(el => el.token == command.token)
      if (foundToken) {
        this._selectUserStoreData.select().then(users => {
          const foundUser = users.find(el => el.uid == foundToken.uidUser)
          if (foundUser) {
            this._selectTaskStoreData.select().then(tasks => {
              const newTasks = tasks.map(task => {
                if (task.idUser == foundUser.uid && task.id == command.id) {
                  return new Task(
                    task.title,
                    task.id,
                    task.idUser,
                    true,
                    task.desc
                  )
                }
                return task
              })
              this._channelTaskStoreData.emit(newTasks)
              this._channelUserTask.emit(newTasks.filter(task => task.idUser == foundUser.uid))
            })
          }
          if (!foundUser) {
            this._channelResultChangeTasks.emit(new ErrorExecutingTaskDto())
          }
        })
      }
      if (!foundToken) {
        this._channelResultChangeTasks.emit(new ErrorExecutingTaskDto())
      }
    })
  }
}