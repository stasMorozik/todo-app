import { ErrorAuthorization } from "../../dto/error-authorization-dto";

export interface ChannelErrorAuthorization {
  emit(e: ErrorAuthorization | null): void
}