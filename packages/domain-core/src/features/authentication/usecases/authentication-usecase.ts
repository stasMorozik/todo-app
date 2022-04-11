import { ChannelTokenStoreData } from "../../../common/ports/out/channel-token-store-data";
import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { AuthenticationCommand } from "../commands/authenticationt-command";
import { ChannelErrorAuthentication } from "../ports/out/channel-error-authentication";
import { ErrorAuthentication } from "../dto/error-authentication-dto";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { Token } from "../../../common/types/token";

export class AuthenticationUseCase {
  constructor(
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _channelTokenStoreData: ChannelTokenStoreData,
    private readonly _channelErrorAuthentication: ChannelErrorAuthentication
  ){}

  authentication(command: AuthenticationCommand): void {
    this._selectUserStoreData.select().then(users => {
      const foundUser = users.find(el => el.email == command.authenticationData.email && el.password == command.authenticationData.password)
      if (!foundUser) {
        this._channelErrorAuthentication.emit(new ErrorAuthentication())
      }

      if (foundUser) {
        this._selectStoreTokenData.select().then(tokens => {
          const now = new Date()
          this._channelTokenStoreData.emit([...tokens, new Token(
            now.toISOString(),
            now.getTime(),
            foundUser.uid
          )])
        }).catch(e => {

        })
      }
    }).catch(e => {

    })
  }
}