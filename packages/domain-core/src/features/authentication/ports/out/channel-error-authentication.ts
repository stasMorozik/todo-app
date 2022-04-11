import { ErrorAuthentication } from "../../dto/error-authentication-dto";

export interface ChannelErrorAuthentication {
  emit(e: ErrorAuthentication | null): void
}