import { SendToAddressFactory } from "./factories/SendToAddressFactory"
import { SignSerializedTransactionFactory } from "./factories/SignSerializedTransactionFactory"
import { GetFromWifFactory } from "./factories/GetFromWifFactory"
import { GetBalanceFactory } from "./factories/GetBalanceFactory"
import { GetWalletsFactory } from "./factories/GetWalletsFactory"
import { GetP2SHAddressFactory } from "./factories/GetP2SHAddressFactory"
import { GetScriptFactory } from "./factories/GetScriptFactory"

import { ViewSerializedTransactionUseCase } from "./useCases/ViewSerializedTransaction/ViewSerializedTransactionUseCase"

class App {

  public async execute() {

    const argv = process.argv.slice(2)[0]

    const viewSerializedTransactionUseCase = new ViewSerializedTransactionUseCase()
    const getWalletsFactory = GetWalletsFactory()
    const getFromWifFactory = GetFromWifFactory()
    const sendToAddressFactory = SendToAddressFactory()
    const signSerializedTransactionFactory = SignSerializedTransactionFactory()
    const getBalanceFactory = GetBalanceFactory()
    const getP2SHAddressFactory = GetP2SHAddressFactory()
    const getScriptFactory = GetScriptFactory()
    // 2N1n3wq3eFELjsH4E6YuQSW1pbQHaXmSTmF 2000 3

    const privateKey = getWalletsFactory.execute().profile.privatekey
    const keyPair = getFromWifFactory.execute(privateKey)
    const pubKeys = getWalletsFactory.execute().rings
    const address = getP2SHAddressFactory.execute(pubKeys)
    const script = getScriptFactory.execute(address)

    switch (argv) {
      case '--sendtoaddress': // enviar bitcoin
        await sendToAddressFactory.execute(keyPair)
        break
      case '--signrawtransaction': // assinar transação 
        signSerializedTransactionFactory.execute(keyPair)
        break
      case '--balance': // assinar transação 
        getBalanceFactory.execute(address.toString())
        break
      case '--viewrawtransaction':
        viewSerializedTransactionUseCase.execute(script)
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