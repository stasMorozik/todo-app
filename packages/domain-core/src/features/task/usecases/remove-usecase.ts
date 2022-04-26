import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { SelectTaskStoreData } from "../ports/in/select-task-store-data";
import { ChannelUserTask } from "../ports/out/channel-user-task";
import { ChannelTaskStoreData } from "../ports/out/channel-task-store-data";
import { RemoveCommand } from "../commands/remove-command";

export class RemoveUseCase {
  constructor(
    private readonly _channelUserTask: ChannelUserTask,
    private readonly _selectTaskStoreData: SelectTaskStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelTaskStoreData: ChannelTaskStoreData
  ){}

  remove(command: RemoveCommand){
    
  }
}