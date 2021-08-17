import { IBitcoinController } from "../../controllers/IBitcoinController";

export class SignSerializedTransactionUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) { }

  public execute(keyPair: any) {

    const serialized = JSON.parse(Buffer.from(process.argv.slice(2)[1], "hex").toString("utf-8"))
    const signatured = this.bitcoinController.signSerializedTransaction({ serialized, keyPair })

    const serializedObj = signatured.toObject()
    const raw = Buffer.from(JSON.stringify(serializedObj)).toString("hex")
    console.log(
      // Buffer.from(raw, "hex").toString("utf-8")
      signatured
    )
  }
}
