import { IBitcoinController } from "../../controllers/IBitcoinController"
import { networks } from "bitcoinjs-lib"
import bitcore from "bitcore-lib"
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'

export class RetrieveFromSeedUseCase {

  constructor(
    private bitcoinController: IBitcoinController
  ) { }

  async execute(t: number = 12) {

    const seedWds = process.argv.slice(2)[1]
    console.log(seedWds)

    if (t === 12 || t === 24) {
      const words = seedWds.trim()
      if (words.split(" ").length === t) {

        const privatekey = this.bitcoinController.getKeyMnemonic(seedWds)

        const seed = bip39.mnemonicToSeedSync(seedWds)
        const node = bip32.fromSeed(seed, networks.testnet)

        const keyPair = new bitcore.PrivateKey(node.toWIF(), bitcore.Networks.testnet)
        console.log(keyPair.toAddress().toString())

      } else {
        console.error("Seed with an invalid size")
      }
    } else {
      console.error("Enter a valid length 12 or 24 words")
    }
  }
}