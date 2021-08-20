import { IBitcoinController } from "../../controllers/IBitcoinController";

export class GetPubKeyHashUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) {}

  async execute(privateKey: string) {
    const pubkeyHash = this.bitcoinController.getPubkeyHash(privateKey)
    console.log()
    console.log("Pub Key Hash:", pubkeyHash)
    console.log()
    return pubkeyHash
  }
}