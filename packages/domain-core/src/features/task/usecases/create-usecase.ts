import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { SelectTaskStoreData } from "../ports/in/select-task-store-data";
import { ChannelUserTask } from "../ports/out/channel-user-task";
import { ChannelTaskStoreData } from "../ports/out/channel-task-store-data";
import { CreateCommand } from "../commands/create-command";

export class CreateUseCase {
  constructor(
    private readonly _channelUserTask: ChannelUserTask,
    private readonly _selectTaskStoreData: SelectTaskStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelTaskStoreData: ChannelTaskStoreData
  ){}

  create(command: CreateCommand){
    
  }
}