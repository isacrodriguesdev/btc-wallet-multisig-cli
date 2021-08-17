import { IBitcoinController } from "../../controllers/IBitcoinController";

export class GetScriptUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) {}

  public execute(address: any) {
    return this.bitcoinController.getScript(address)
  }
}