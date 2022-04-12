import { SelectTokenStoreData } from "../../../common/ports/in/select-token-store-data";
import { SelectUserStoreData } from "../../../common/ports/in/select-user-store-data";
import { AuthorizationCommand } from "../commands/authorization-command";
import { DeAuthorizationCommand } from "../commands/de-authorization-command";
import { ErrorAuthorization } from "../dto/error-authorization-dto";
import { ChannelTokenStoreData } from "../../../common/ports/out/channel-token-store-data";
import { User } from "../../../common/types/user";
import { ChannelResultAuthorization } from "../ports/out/channel-result-authorization";
import { SuccessDeAuthorizationDto } from "../dto/success-deauthorization-dto";

export class AuthorizationUseCase {
  constructor(
    private readonly _selectStoreTokenData: SelectTokenStoreData,
    private readonly _selectUserStoreData: SelectUserStoreData,
    private readonly _channelTokenStoreData: ChannelTokenStoreData,
    private readonly _channelResultAuthorization: ChannelResultAuthorization
  ){}

  authorization(command: AuthorizationCommand | DeAuthorizationCommand) {
    this._selectStoreTokenData.select().then(tokens => {
      const foundToken = tokens.find(el => el.token == command.token)
      if (foundToken) {
        if (command instanceof AuthorizationCommand) {
          const now = new Date().getTime()
          const difference = now - foundToken.date
          if (difference > 300000) {
            this._channelResultAuthorization.emit(new ErrorAuthorization())
          } else {
            this._selectUserStoreData.select().then(users => {
              const foundUser = users.find(el => el.uid == foundToken.uidUser)
              if (foundUser) {
                this._channelResultAuthorization.emit(new User(
                  foundUser.uid,
                  foundUser.name,
                  foundUser.email
                ))
              } else {
                this._channelResultAuthorization.emit(new ErrorAuthorization())
              }
            }).catch(e => {})
          }
        }

        if (command instanceof DeAuthorizationCommand) {
          this._channelTokenStoreData.emit(tokens.filter(el => el.token != command.token))
          this._channelResultAuthorization.emit(new SuccessDeAuthorizationDto())
        }
      } else {
        this._channelResultAuthorization.emit(new ErrorAuthorization())
      }
    }).catch(e => {

    })
  }
}