import { User } from "../../types/user";

export interface SelectUserStoreData {
  select(): Promise<User[]>
}