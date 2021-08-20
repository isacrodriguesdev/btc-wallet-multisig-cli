import { GetPubKeyHashUseCase } from "../useCases/GetPubKeyHash/GetPubKeyHashUseCase"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function GetPubKeyHashFactory() {

  const bitcoinControllerAdapter = new BitcoreControllerAdapter()

  return new GetPubKeyHashUseCase(bitcoinControllerAdapter)
}