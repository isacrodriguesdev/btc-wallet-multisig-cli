
export interface ITarget {
  address: string
  value: number
}

export interface IBlockchainReposity {
  getUtxo(address: string): any
  getInfo(utxos: string[], targets: ITarget[], feeRate: number): any
}
