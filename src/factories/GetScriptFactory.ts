import { GetScriptUseCase } from "../useCases/GetScript/GetScriptUseCase"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function GetScriptFactory() {

  const bcoinControllerAdapter = new BitcoreControllerAdapter()

  return new GetScriptUseCase(bcoinControllerAdapter)
}