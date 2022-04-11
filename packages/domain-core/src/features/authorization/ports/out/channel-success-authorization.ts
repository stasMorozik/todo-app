import { User } from "../../../../common/types/user";

export interface ChannelSuccessAuthorization {
  emit(user: User | null): void
}