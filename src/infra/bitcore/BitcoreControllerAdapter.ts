import bitcore, { Transaction } from "bitcore-lib"
import { ITransaction, ITransactionSerialized, IBitcoinController } from "../../controllers/IBitcoinController";
import { IKeyPair } from "../../protocols/IKeyPair";

class BitcoreControllerAdapter implements IBitcoinController {

  constructor() { }

  fromP2SH(publicKeys: string[]): bitcore.Address {
    // @ts-ignore
    return new bitcore.Address(publicKeys, publicKeys.length - 1, bitcore.Networks.testnet)
  }

  fromWif(privatekey: string) {
    return new bitcore.PrivateKey(privatekey)
  }

  signSerializedTransaction(transaction: ITransactionSerialized) {
    const { serialized, keyPair } = transaction
    return new Transaction(serialized).sign(keyPair)
  }

  createTransaction(transaction: ITransaction) {
    const { utxo, toAddress, amount, fee, changeAddress, keyPair } = transaction
    
    return new Transaction()
      // @ts-ignore
      .from(utxo, transaction.pubKeys, transaction.threshold)
      .to(toAddress, amount)
      .fee(fee)
      .change(changeAddress)
      .sign(keyPair)
  }


  getScript(address: any) {
    return new bitcore.Script(address)
  }
}

export { BitcoreControllerAdapter }