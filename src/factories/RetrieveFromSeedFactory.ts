import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"
import { RetrieveFromSeedUseCase } from "../useCases/RetrieveFromSeed/RetrieveFromSeedUseCase"

export function RetrieveFromSeedFactory() {

  const bitcoinControllerAdapter = new BitcoreControllerAdapter()

  return new RetrieveFromSeedUseCase(bitcoinControllerAdapter)
}