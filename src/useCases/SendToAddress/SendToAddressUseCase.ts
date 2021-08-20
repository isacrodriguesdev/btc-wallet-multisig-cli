import { IBitcoinController } from "../../controllers/IBitcoinController";
import { IBlockchainReposity } from "../../repositories/IBlockchainReposity";
import { GetP2SHAddressFactory } from "../../factories/GetP2SHAddressFactory"
import { GetWalletsFactory } from "../../factories/GetWalletsFactory"
import bitcore, { PublicKey, Transaction } from "bitcore-lib"

class SendToAddressUseCase {

  constructor(
    private blockchainRepository: IBlockchainReposity,
    private bitcoinController: IBitcoinController
  ) { }

  public async execute(keyPair: any): Promise<void> {

    const getWalletsFactory = GetWalletsFactory()
    const getP2SHAddressFactory = GetP2SHAddressFactory()

    const pubKeys = getWalletsFactory.execute().copayers
    const address = getP2SHAddressFactory.execute(pubKeys)

    const argv = process.argv.slice(3)
    const toAddress = argv[0]
    const amount = parseInt(argv[1])
    const feeRate = parseInt(argv[2])

    const utxoResponse = await this.blockchainRepository.getUtxo(address)
    const script = this.bitcoinController.getScript(address)

    const { fee } = this.blockchainRepository.getInfo(utxoResponse.data, [{ address: toAddress, value: amount }], feeRate)

    const utxo = utxoResponse.data.map(output => ({
      txId: output.txid,
      outputIndex: output.vout,
      script: script,
      address: address.toString(),
      satoshis: output.value,
    }))

    const transaction = this.bitcoinController.createTransaction({
      utxo: utxo,
      fee: fee,
      toAddress: toAddress,
      changeAddress: address.toString(),
      amount: amount,
      keyPair: keyPair,
      pubKeys: pubKeys,
      threshold: pubKeys.length - 1
    })

    const serialized = {
      ...transaction.toObject(),
      toAddress: [{ address: toAddress, value: amount }],
      total: [{ address: toAddress, value: amount }].reduce((total, { value }) => total + value, 0),
    }
    const raw = Buffer.from(JSON.stringify(serialized)).toString("hex")
    console.log(raw)
  }
}

export { SendToAddressUseCase }