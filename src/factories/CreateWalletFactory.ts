import { CreateWalletUseCase } from "../useCases/CreateWallet/CreateWalletUseCase"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"

export function CreateWalletFactory() {

  const bitcoreControllerAdapter = new BitcoreControllerAdapter()

  return new CreateWalletUseCase(bitcoreControllerAdapter)
}