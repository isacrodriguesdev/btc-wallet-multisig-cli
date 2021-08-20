import { IBitcoinController } from "../../controllers/IBitcoinController"
import fs from "fs"
import path from "path"
import { networks } from "bitcoinjs-lib"
import bitcore from "bitcore-lib"
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'

export class CreateWalletUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) { }

  public execute(network: string = "testnet", fileName: string = "wallets", ext: string = "json") {
    const keyWds = this.bitcoinController.createMnemonic().toString()
    const keyMnemonic = this.bitcoinController.getKeyMnemonic(keyWds)

    const seed = bip39.mnemonicToSeedSync(keyWds)
    const node = bip32.fromSeed(seed, networks.testnet)

    const keyPair = new bitcore.PrivateKey(node.toWIF(), bitcore.Networks.testnet)

    const rName = path.resolve(fileName + "." + ext)
    const rFile = fs.existsSync(rName)

    if (!rFile) {
      const objWallet = {
        data: { privatekey: keyPair.toWIF(), mnemonic: keyWds },
        copayers: [
          keyPair.toPublicKey().toString()
        ],
        network
      }

      return fs.writeFileSync(rName, JSON.stringify(objWallet))
    }
  }
}