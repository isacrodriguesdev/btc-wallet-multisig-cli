import { IBitcoinController } from "../../controllers/IBitcoinController";

export class GetFromWifUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) { }

  public execute(privateKey: string) {
    return this.bitcoinController.fromWif(privateKey)
  }
}