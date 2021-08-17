import { IBlockchainReposity } from "../../repositories/IBlockchainReposity";

class GetBalanceWalletUseCase {

  constructor(
    private blockchain: IBlockchainReposity
  ) { }

  public async execute(address: string) {
    try {
      const utxoResponse = await this.blockchain.getUtxo(address)
      const balance = utxoResponse.data.reduce((total: number, { value }) => total + value, 0)

      console.log("\n")
      console.log("::: Wallet multisig balance :::", "\n\naddress:", address,"\n")
      console.log("bitcoin (btc):", balance / 100000000,"\nbitcoin (sats)", balance,"\n")
      console.log("::::::::::::::::::::::::::::::::::::::::::::::::")
    } catch (error) {
      console.log(error)
    }
  }
}

export { GetBalanceWalletUseCase }