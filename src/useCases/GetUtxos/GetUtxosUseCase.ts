import { IBlockchainReposity } from "../../repositories/IBlockchainReposity";

class GetUtxosUseCase {

  constructor(
    private blockchain: IBlockchainReposity
  ) {}

  public async execute(address: string) {
    try {
      const utxo = await this.blockchain.getUtxo(address)
      return {
        data: utxo.data
      }
    } catch (error) {
      return { data: {}, error }
    }
  }
}

export { GetUtxosUseCase }