import { GetWalletsUseCase } from "../useCases/GetWallets/GetWalletsUseCase";
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function GetWalletsFactory() {
  return new GetWalletsUseCase()
}