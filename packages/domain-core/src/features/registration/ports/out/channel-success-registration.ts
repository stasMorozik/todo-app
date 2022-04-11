import { User } from "../../../../common/types/user";

export interface ChannellSuccessRegistration {
  emit(user: User | null): void
}