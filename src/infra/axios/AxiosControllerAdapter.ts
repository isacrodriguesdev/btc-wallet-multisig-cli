import axios from "axios"
const { get } = axios
import coinSelect from "coinselect"
import { IBlockchainReposity, ITarget } from "../../repositories/IBlockchainReposity"

class AxiosControllerAdapter implements IBlockchainReposity {

  public async getUtxo(address: string, network: string = "testnet") {

    const networkUrl = network != "mainnet" ? network + "/" : ""

    return get(`https://mempool.space/${networkUrl}api/address/${address}/utxo`)
  }

  public getInfo(utxos: string[], targets: ITarget[], feeRate: number) {
    return coinSelect(utxos, targets, feeRate)
  }
}

export { AxiosControllerAdapter }