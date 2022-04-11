import { ErrorAlreadyExists } from "../../dto/error-alreday-exists";

export interface ChannelErrorRegistration {
  emit(e: ErrorAlreadyExists | null): void
}