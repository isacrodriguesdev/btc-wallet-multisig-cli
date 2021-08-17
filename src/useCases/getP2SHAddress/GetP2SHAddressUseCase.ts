import { IBitcoinController } from "../../controllers/IBitcoinController";

export class GetP2SHAddressUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) { }

  execute(pubKeys: string[]) {
    return this.bitcoinController.fromP2SH(pubKeys)
  }
}