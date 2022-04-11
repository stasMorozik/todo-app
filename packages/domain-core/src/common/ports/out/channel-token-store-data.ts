import { Token } from "../../../common/types";

export interface ChannelTokenStoreData {
  emit(tokens: Token[]): void
}