import { ErrorAlreadyExists } from "../../dto/error-alreday-exists";
import { User } from "../../../../common/types/user";

export interface ChannelResultRegistration {
  emit(e: User | ErrorAlreadyExists | null): void
}