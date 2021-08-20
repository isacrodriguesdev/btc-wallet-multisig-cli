import { IKeyPair } from "../protocols/IKeyPair";
import bitcore from "bitcore-lib"

export interface ITransaction {
  utxo: any[]
  fee: number
  toAddress: string
  amount: number
  changeAddress: string
  keyPair: any
  pubKeys?: string[]
  threshold?: number
}

export interface ITransactionSerialized {
  serialized: string | object | Buffer
  keyPair: any
}

interface IBitcoinController {
  fromP2SH(pukeys: string[]): any
  fromWif(privatekey: string): any
  signSerializedTransaction(transaction: ITransactionSerialized): any
  createTransaction(transaction: ITransaction): any
  getScript(address: any): any
  createMnemonic(): string
  getKeyMnemonic(seendWds: string): string
  getPubkeyHash(privatekey: string): string
}

export { IBitcoinController }