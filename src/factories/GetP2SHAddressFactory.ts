import { GetP2SHAddressUseCase } from "../useCases/GetP2SHAddress/GetP2SHAddressUseCase";
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function GetP2SHAddressFactory() {

  const bcoinControllerAdapter = new BitcoreControllerAdapter()

  return new GetP2SHAddressUseCase(bcoinControllerAdapter)
}