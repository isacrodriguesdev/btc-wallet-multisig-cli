import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"
import { LoadWalletMultisigUseCase } from "../useCases/LoadWalletMultisig/LoadWalletMultisigUseCase"

export function LoadWalletMultisigFactory() {

  const bCoinControllerAdapter = new BitcoreControllerAdapter()

  return new LoadWalletMultisigUseCase(bCoinControllerAdapter)
}