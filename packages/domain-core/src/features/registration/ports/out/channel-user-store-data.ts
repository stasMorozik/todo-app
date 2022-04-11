import { User } from "../../../../common/types/user";

export interface ChannelUserStoreData {
  emit(users: User[]): void
}