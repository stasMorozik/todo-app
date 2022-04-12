import { User } from "../../../../common/types/user";
import { ErrorAuthorization } from "../../dto/error-authorization-dto";
import { SuccessDeAuthorizationDto } from "../../dto/success-deauthorization-dto";

export interface ChannelResultAuthorization {
  emit(e: ErrorAuthorization | SuccessDeAuthorizationDto | User | null): void
}