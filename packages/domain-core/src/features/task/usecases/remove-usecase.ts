import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { SelectTaskStoreData } from "../ports/in/select-task-store-data";
import { ChannelUserTask } from "../ports/out/channel-user-task";
import { ChannelTaskStoreData } from "../ports/out/channel-task-store-data";
import { RemoveCommand } from "../commands/remove-command";
import { ChannelResultExchange } from "../ports/out/channel-result-change-tasks";
import { ErrorRemovingTaskDto } from "../dto/error-removing-task-dto";

export class RemoveUseCase {
  constructor(
    private readonly _channelUserTask: ChannelUserTask,
    private readonly _selectTaskStoreData: SelectTaskStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelTaskStoreData: ChannelTaskStoreData,
    private readonly _channelResultExchange: ChannelResultExchange
  ){}

  remove(command: RemoveCommand){
    this._selectStoreTokenData.select().then(tokens => {
      const foundToken = tokens.find(el => el.token == command.token)
      if (foundToken) {
        this._selectUserStoreData.select().then(users => {
          const foundUser = users.find(el => el.uid == foundToken.uidUser)
          if (foundUser) {
            this._selectTaskStoreData.select().then(tasks => {
              const newTasks = tasks.filter(task => task.id == command.id && task.idUser == foundUser.uid)
              this._channelTaskStoreData.emit(newTasks)
              this._channelUserTask.emit(newTasks.filter(task => task.idUser == foundUser.uid))
            })
          }
          if (!foundUser) {
            this._channelResultExchange.emit(new ErrorRemovingTaskDto())
          }
        })
      }
      if (!foundToken) {
        this._channelResultExchange.emit(new ErrorRemovingTaskDto())
      }
    })
  }
}