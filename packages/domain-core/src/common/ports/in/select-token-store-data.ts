import { Token } from "../../types/token";

export interface SelectTokenStoreData {
  select(): Promise<Token[]>
}