import { GetFromWifUseCase } from "../useCases/GetFromWif/GetFromWifUseCase"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function GetFromWifFactory() {

  const bcoinControllerAdapter = new BitcoreControllerAdapter()

  return new GetFromWifUseCase(bcoinControllerAdapter)
}