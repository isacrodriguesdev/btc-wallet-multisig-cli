import bitcore, { Transaction } from "bitcore-lib"
import { ITransaction, ITransactionSerialized, IBitcoinController } from "../../controllers/IBitcoinController"
import Mnemonic from 'bitcore-mnemonic'
// import { Insight } from 'bitcore-insight'
// let insight = new Insight('testnet')

class BitcoreControllerAdapter implements IBitcoinController {

  constructor() { }

  broadcastTransaction(tx: string) {
    // insight.broadcast(tx, (err: any, returnedTxId: string) => {
    //   if (err) {
    //     // Handle errors...
    //   } else {
    //     console.log()
    //     console.log(returnedTxId)
    //     console.log()
    //     // Mark the transaction as broadcasted
    //   }
    // });
  }

  createMnemonic(): string {
    const mnemonic = new Mnemonic()
    console.log()
    console.log("mnemonic:", mnemonic.toString())
    console.log()
    return mnemonic
  }

  getKeyMnemonic(seendWds: string): string {
    return new Mnemonic(seendWds).toHDPrivateKey(bitcore.Networks.testnet).toString()
  }

  fromP2SH(publicKeys: string[]): bitcore.Address {
    // @ts-ignore
    return new bitcore.Address(publicKeys, publicKeys.length - 1, bitcore.Networks.testnet)
  }

  fromWif(privatekey: string): any {
    return new bitcore.PrivateKey(privatekey, bitcore.Networks.testnet)
  }

  signSerializedTransaction(transaction: ITransactionSerialized) {
    const { serialized, keyPair } = transaction
    return new Transaction(serialized).sign(keyPair)
  }

  createTransaction(transaction: ITransaction): any {
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

  getPubkeyHash(privatekey: string): string {
    // @ts-ignore
    return new bitcore.PrivateKey(privatekey, bitcore.Networks.testnet).toPublicKey().toString()
  }
}

export { BitcoreControllerAdapter }