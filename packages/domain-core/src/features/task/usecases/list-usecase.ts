import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { ListCommand } from "../commands/list-command";
import { SearchCommand } from "../commands/search-command";
import { SelectTaskStoreData } from "../ports/in/select-task-store-data";
import { ChannelUserTask } from "../ports/out/channel-user-task";

export class ListUseCase {
  constructor(
    private readonly _channelUserTask: ChannelUserTask,
    private readonly _selectTaskStoreData: SelectTaskStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
  ){}

  list(command: ListCommand | SearchCommand) {
    this._selectStoreTokenData.select().then(tokens => {
      const foundToken = tokens.find(el => el.token == command.token)
      if (foundToken) {
        this._selectUserStoreData.select().then(users => {
          const foundUser = users.find(el => el.uid == foundToken.uidUser)
          if (foundUser) {
            this._selectTaskStoreData.select().then(tasks => {
              if (command instanceof ListCommand) {
                this._channelUserTask.emit(tasks.filter(task => task.idUser == foundUser.uid))
              }
      
              if (command instanceof SearchCommand) {
                this._channelUserTask.emit(tasks.filter(task => task.idUser == foundUser.uid && task.title.indexOf(command.title) == 0))
              }
            })
          }
        })
      }
    })

    
  }
}