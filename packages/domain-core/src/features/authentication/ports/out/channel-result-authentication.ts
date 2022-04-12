import { Token } from "../../../../common/types/token";
import { ErrorAuthentication } from "../../dto/error-authentication-dto";

export  interface ChannelResultAuthentication {
  emit(e: ErrorAuthentication | Token | null): void
}