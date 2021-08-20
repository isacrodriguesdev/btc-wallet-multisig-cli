import { SendToAddressFactory } from "./factories/SendToAddressFactory"
import { SignSerializedTransactionFactory } from "./factories/SignSerializedTransactionFactory"
import { GetFromWifFactory } from "./factories/GetFromWifFactory"
import { GetBalanceFactory } from "./factories/GetBalanceFactory"
import { GetWalletsFactory } from "./factories/GetWalletsFactory"
import { GetP2SHAddressFactory } from "./factories/GetP2SHAddressFactory"
import { GetScriptFactory } from "./factories/GetScriptFactory"
import { CreateWalletFactory } from "./factories/CreateWalletFactory"
import { GetPubKeyHashFactory } from "./factories/GetPubKeyHashFactory"
import { RetrieveFromSeedFactory } from "./factories/RetrieveFromSeedFactory"

import { ViewSerializedTransactionUseCase } from "./useCases/ViewSerializedTransaction/ViewSerializedTransactionUseCase"
import { AddCopayersUseCase } from "./useCases/AddCopayers/AddCopayersUseCase"

class App {

  public async execute() {

    const argv = process.argv.slice(2)[0]

    const viewSerializedTransactionUseCase = new ViewSerializedTransactionUseCase()
    const addCopayersUseCase = new AddCopayersUseCase()
    const getPubKeyHashFactory = GetPubKeyHashFactory()
    const getWalletsFactory = GetWalletsFactory()
    const getFromWifFactory = GetFromWifFactory()
    const sendToAddressFactory = SendToAddressFactory()
    const signSerializedTransactionFactory = SignSerializedTransactionFactory()
    const getBalanceFactory = GetBalanceFactory()
    const getP2SHAddressFactory = GetP2SHAddressFactory()
    const getScriptFactory = GetScriptFactory()
    const createWalletFactory = CreateWalletFactory()
    const retrieveFromSeedFactory = RetrieveFromSeedFactory()
    // 2N1n3wq3eFELjsH4E6YuQSW1pbQHaXmSTmF 2000 3

    if (getWalletsFactory.execute().error) {
      return createWalletFactory.execute()
    }

    const datWallet = getWalletsFactory.execute()

    if (datWallet.error) return console.error("Error getting your wallet this contacting the developer")

    const privateKey = datWallet.data.privatekey
    const keyPair = getFromWifFactory.execute(privateKey)
    const pubKeys = datWallet.copayers

    if (pubKeys.length >= 2) {
      const address = getP2SHAddressFactory.execute(pubKeys)
      const script = getScriptFactory.execute(address)

      switch (argv) {
        case '--balance': // ver saldo
          getBalanceFactory.execute(address.toString())
          return
        case '--viewtx': // ver uma transação
          viewSerializedTransactionUseCase.execute(script)
          return
        default:
          console.log('Sorry, that is not something I know how to do.')
      }
    }

    switch (argv) {
      case '--sendtoaddress': // enviar bitcoin
        await sendToAddressFactory.execute(keyPair)
        break
      case '--signtx': // assinar transação 
        signSerializedTransactionFactory.execute(keyPair)
        break
      case '--createwallet': // criar carteira particular
        createWalletFactory.execute()
        break
      case '--addcopayer': // adicionar participantes na multisig
        addCopayersUseCase.execute()
        break
      case '--getpubkey': // obter chave publica extendida
        getPubKeyHashFactory.execute(privateKey)
        break
      case '--recover': // obter chave publica extendida
        retrieveFromSeedFactory.execute()
        break
      default:
        console.log('Sorry, that is not something I know how to do.')
    }
  }
}

export default new App()

// cQPKbLJwChEXHLbdPq5BEGCWErTxwtuVMaqaxD7DooQPPbxo5yQi
// cSXHt1RSmr4cps1FGXjSx4nu71dn7hkxMqrQ6kbaBDhKWAeMr4LQ
// cPrwok7NntxviTPFmnGdcGqfc8ReHUjQUNoGrMssScHwUUMhGoo1