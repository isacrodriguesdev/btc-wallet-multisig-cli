import { IBlockchainReposity } from "../../repositories/IBlockchainReposity";
import { IBitcoinController } from "../../controllers/IBitcoinController";
import { IKeyPair } from "../../protocols/IKeyPair";

class SignTransactionUseCase {

  constructor(
    private blockchainReposity: IBlockchainReposity,
    private bitcoinController: IBitcoinController
  ) { }

  public async execute(spend: any, script: any, address: string, keyPair: IKeyPair) {

    const utxos = await this.blockchainReposity.getUtxo(address)

    // console.log(
    //   "New props\n\n",
    //   utxos.data,
    //   "\n"
    // )
    utxos.data.forEach(utxo => {
      const input = this.bitcoinController.getUtxo({
        script: script.toJSON(),
        value: utxo.value,
        index: utxo.vout,
        hash: utxo.txid
      })
      // console.log("::", input)

      this.bitcoinController.addInput(spend, input)
      this.bitcoinController.scriptInput(spend, input, keyPair)
      this.bitcoinController.signInput(spend, input, keyPair)
    })

    console.log(
      "\n\n",
      spend.toRaw().toString('hex'),
      "\n\n"
    )

    return this.bitcoinController.getHexTransaction(spend)
  }
}

export { SignTransactionUseCase }