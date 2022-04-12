import { ChannelTokenStoreData } from "../../../common/ports/out/channel-token-store-data";
import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { AuthenticationCommand } from "../commands/authenticationt-command";
import { ErrorAuthentication } from "../dto/error-authentication-dto";
import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { Token } from "../../../common/types/token";
import { ChannelResultAuthentication } from "../ports/out/channel-result-authentication";

export class AuthenticationUseCase {
  constructor(
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _channelTokenStoreData: ChannelTokenStoreData,
    private readonly _channelResultAuthentication: ChannelResultAuthentication
  ){}

  authentication(command: AuthenticationCommand): void {
    this._selectUserStoreData.select().then(users => {
      const foundUser = users.find(el => el.email == command.authenticationData.email && el.password == command.authenticationData.password)
      if (!foundUser) {
        this._channelResultAuthentication.emit(new ErrorAuthentication())
      }
      if (foundUser) {
        this._selectStoreTokenData.select().then(tokens => {
          const now = new Date()
          const token = new Token(
            now.toISOString(),
            now.getTime(),
            foundUser.uid
          )
          this._channelTokenStoreData.emit([...tokens, token])
          this._channelResultAuthentication.emit(token)
        }).catch(e => {

        })
      }
    }).catch(e => {

    })
  }
}